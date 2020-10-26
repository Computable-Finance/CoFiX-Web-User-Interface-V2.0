import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { ShareStateService } from '../common/state/share.service';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { CoinContent } from '../swap/swap.page';
import { AddLiquidPage } from './add/add-liquid.page';
import { RedeemLiquidPage } from './redeem/redeem-liquid.page';
import { WarningDetailPage } from './warning/warning-detail/warning-detail.page';

@Component({
  selector: 'app-liquid',
  templateUrl: './liquid.page.html',
  styleUrls: ['./liquid.page.scss'],
})
export class LiquidPage implements OnInit {
  @ViewChild(AddLiquidPage, { static: false }) addLiquidView: AddLiquidPage;
  @ViewChild(RedeemLiquidPage, { static: false })
  redeemLiquidView: RedeemLiquidPage;
  public liquidContent: BannerContent = {
    title: 'liquid_title',
    descriptions: ['liquid_desc1', 'liquid_desc2'],
    more: {
      text: 'liquid_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };
  fromCoin: CoinContent = {
    id: 'ETH',
    address: '',
    amount: '',
    placeholder: '0.0',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: '',
    amount: '',
    placeholder: '0.0',
    isApproved: false,
    balance: '',
  };
  isDropDown: false;
  xtValue = 'XT-1';
  isChecked = true;
  expectedXToken: string;
  earnedRate = { USDT: '', HBTC: '' };
  coinAddress: string;
  todoValue = { USDT: '', HBTC: '' };
  hadValue = { USDT: '', HBTC: '' };
  NAVPerShare = { USDT: '', HBTC: '' };
  shareState: any;
  showAddModel = false;
  showLiquidInfo = false;
  isRotate = { USDT: false, HBTC: false };
  showRedemtionModel = false;
  pairAttended = { USDT: false, HBTC: false };
  coinList = ['USDT', 'HBTC'];
  selectCoin: string;
  colSize = '7';
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils,
    private modalController: ModalController,
    private shareStateService: ShareStateService
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.showWarning();
        this.initCoinContent();
      }, 3000);
    } else {
      this.showWarning();
      this.initCoinContent();
    }
  }
  async showWarning() {
    const knownRisk = this.shareStateQuery.getValue().knownRisk;
    if (!knownRisk) {
      const modal = await this.modalController.create({
        component: WarningDetailPage,
        cssClass: 'popover-warning',
        animated: false,
        keyboardClose: false,
        showBackdrop: true,
        backdropDismiss: false,
      });
      await modal.present();
      modal.onDidDismiss().then((data: any) => {
        if (data.data.knownRisk) {
          this.shareStateService.updateKnownRisk(data.data.knownRisk);
        }
      });
    }
  }
  refreshPage() {
    this.initCoinContent();
    if (this.showAddModel) {
      this.addLiquidView.ngOnInit();
    }
    if (this.showRedemtionModel) {
      this.redeemLiquidView.ngOnInit();
    }
  }
  async setExpectedXToken() {
    this.expectedXToken = await this.cofixService.expectedXToken(
      this.toCoin.address,
      this.fromCoin.amount || '0',
      this.toCoin.amount || '0'
    );
  }

  addLiquid(coin) {
    this.showAddModel = true;
    this.showRedemtionModel = false;
    this.showLiquidInfo = false;
    this.selectCoin = coin;
    this.toCoin.id = coin;
  }
  async closeAddLiquid(event) {
    console.log(event);
    this.showAddModel = false;
    if (event.type === 'add') {
      this.fromCoin = event.fromCoin;
      this.toCoin = event.toCoin;
      this.initCoinContent();
      this.showLiquidInfo = true;
      this.showAddModel = false;
    } else {
      this.toCoin = event.toCoin;
    }
  }

  changeCoin(event) {
    this.toCoin.id = event.coin;
    this.initCoinContent();
  }

  getValueFromStateQuery() {
    this.coinList.forEach(async (coinItem) => {
      this.pairAttended[
        coinItem
      ] = this.shareStateQuery.getValue().pairAttended[coinItem];
    });
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedXToken = '';
    this.shareState = this.shareStateQuery.getValue();
    if (
      !this.shareState.tokenPairAddress[this.toCoin.id] ||
      !this.shareState.stakingPoolAddress[this.toCoin.id]
    ) {
      await this.utils.updateShareAddress(this.shareState);
    }
    this.coinList.forEach(async (coinItem) => {
      this.earnedRate[
        coinItem
      ] = await this.cofixService.earnedCofiAndRewardRate(
        this.shareState.stakingPoolAddress[coinItem]
      );
    });

    if (this.shareState.connectedWallet) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];

      this.getValueFromStateQuery();
      if (!this.pairAttended.USDT || !this.pairAttended.HBTC) {
        this.utils.getPairAttended();
        this.getValueFromStateQuery();
      }

      this.coinList.forEach(async (coinItem) => {
        this.todoValue[coinItem] = await this.balanceTruncatePipe.transform(
          await this.cofixService.getERC20Balance(
            this.shareState.tokenPairAddress[coinItem]
          )
        );
        this.hadValue[coinItem] = await this.balanceTruncatePipe.transform(
          await this.cofixService.getERC20Balance(
            this.shareState.stakingPoolAddress[coinItem]
          )
        );
        this.NAVPerShare[coinItem] = (
          await this.cofixService.calculateArgumentsUsedByGetAmountRemoveLiquidity(
            this.cofixService.getCurrentContractAddressList()[coinItem],
            this.shareState.tokenPairAddress[coinItem],
            '1',
            false
          )
        ).nAVPerShareForBurn;
      });
    }
  }

  showMore(coin) {
    this.isRotate[coin] = !this.isRotate[coin];
  }

  redemption(coin) {
    this.showRedemtionModel = true;
    this.selectCoin = coin;
  }

  closeRedeemLiquid(event) {
    this.showRedemtionModel = false;
    if (event.type === 'redeem') {
      this.fromCoin = event.fromCoin;
      this.toCoin = event.toCoin;
      this.initCoinContent();
      this.showLiquidInfo = true;
      this.showRedemtionModel = false;
    }
  }

  walletConnected() {
    this.initCoinContent();
  }

  isDisplay() {
    this.colSize = window.innerWidth < 400 ? '8' : '7';
    return !(window.innerWidth < 400);
  }
}
