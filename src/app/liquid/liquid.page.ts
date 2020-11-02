import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { ShareStateService } from '../common/state/share.service';
import { ShareState } from '../common/state/share.store';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { CoinContent } from '../swap/swap.page';
import { AddLiquidPage } from './add/add-liquid.page';
import { TokenMiningPage } from './mining/mining.page';
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
  @ViewChild(TokenMiningPage, { static: false })
  tokenDepositView: TokenMiningPage;
  public liquidContent: BannerContent = {
    title: 'liquid_title',
    descriptions: ['liquid_desc1', 'liquid_desc2', 'liquid_desc3'],
    more: {
      text: 'read_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };

  withdrawContent: BannerContent = {
    title: 'help_tips',
    descriptions: [
      'withdraw_help_desc1',
      'withdraw_help_desc2',
      'withdraw_help_desc3',
    ],
    more: {
      text: 'read_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };
  lpwithdrawContent: BannerContent = {
    title: 'help_tips',
    descriptions: [
      'liquidpool_withdraw_help_desc1',
      'liquidpool_withdraw_help_desc2',
      'liquidpool_withdraw_help_desc2',
    ],
    more: {
      text: 'read_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };
  liquidContent_origin: BannerContent;
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

  ETHAmountForRemoveLiquidity = { USDT: '', HBTC: '' };
  tokenAmountForRemoveLiquidity = { USDT: '', HBTC: '' };
  shareState: ShareState;
  showAddModel = false;
  showLiquidInfo = false;
  isRotate = { USDT: false, HBTC: false };
  showRedemtionModel = false;
  pairAttended = { USDT: true, HBTC: true };
  coinList = ['USDT', 'HBTC'];
  selectCoin: string;
  colSize = '7';
  miningProfit = { title: '', subtitle: '', isDeposit: false };
  showZeroInfo: boolean = false;
  tokenName = 'XTokens-gray';
  questionImgName = 'question';
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils,
    private modalController: ModalController,
    private shareStateService: ShareStateService,
    private rd: Renderer2
  ) {
    this.liquidContent_origin = this.liquidContent;
  }

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
    console.log(this.earnedRate);
    this.coinList.forEach(async (coinItem) => {
      this.earnedRate[
        coinItem
      ] = await this.cofixService.earnedCofiAndRewardRate(
        this.cofixService.getCurrentContractAddressList()[coinItem]
      );
    });
    if (this.cofixService.getCurrentAccount()) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];
      this.getValueFromStateQuery();
      if (!this.pairAttended.USDT || !this.pairAttended.HBTC) {
        await this.utils.getPairAttended();
        this.getValueFromStateQuery();
      }
      this.coinList.forEach(async (coinItem) => {
        const pairAddress = await this.cofixService.getPairAddressByToken(
          this.cofixService.getCurrentContractAddressList()[coinItem]
        );
        const stakingPoolAddress = await this.cofixService.getStakingPoolAddressByToken(
          this.cofixService.getCurrentContractAddressList()[coinItem]
        );
        this.todoValue[coinItem] = await this.balanceTruncatePipe.transform(
          await this.cofixService.getERC20Balance(pairAddress)
        );
        console.log(
          this.cofixService.getCurrentContractAddressList()[coinItem]
        );
        console.log(stakingPoolAddress);

        this.hadValue[coinItem] = await this.balanceTruncatePipe.transform(
          await this.cofixService.getERC20Balance(stakingPoolAddress)
        );
        this.NAVPerShare[coinItem] = (
          await this.cofixService.calculateArgumentsUsedByGetAmountRemoveLiquidity(
            this.cofixService.getCurrentContractAddressList()[coinItem],
            pairAddress,
            '1',
            false
          )
        ).nAVPerShareForBurn;

        const address = this.cofixService.getCurrentContractAddressList()[
          coinItem
        ];
        const resultETH = await this.cofixService.getETHAmountForRemoveLiquidity(
          address,
          pairAddress,
          this.todoValue[coinItem] || '0'
        );
        this.ETHAmountForRemoveLiquidity[coinItem] = resultETH.result;
        const resultToken = await this.cofixService.getTokenAmountForRemoveLiquidity(
          address,
          pairAddress,
          this.todoValue[coinItem] || '0'
        );
        this.tokenAmountForRemoveLiquidity[coinItem] = resultToken.result;
      });
    }
  }

  showMore(coin) {
    this.isRotate[coin] = !this.isRotate[coin];
  }

  redemption(coin) {
    this.showRedemtionModel = true;
    this.selectCoin = coin;
    this.liquidContent = this.lpwithdrawContent;
  }

  closeRedeemLiquid(event) {
    this.showRedemtionModel = false;
    this.liquidContent = this.liquidContent_origin;
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

  showSkeleton(value) {
    return value === undefined || value === '';
  }
  canShow() {
    return (
      !this.showMiningModel && !this.showAddModel && !this.showRedemtionModel
    );
  }
  showMiningModel: boolean = false;
  depositToken(coin) {
    this.miningProfit = {
      title: 'miningpool_deposit_title',
      subtitle: 'miningpool_deposit_subtitle',
      isDeposit: true,
    };
    this.showMiningModel = true;
    this.showLiquidInfo = false;
    this.selectCoin = coin;
    this.toCoin.id = coin;
  }

  withdrawToken(coin) {
    this.miningProfit = {
      title: 'miningpool_withdraw_title',
      subtitle: 'miningpool_withdraw_subtitle',
      isDeposit: false,
    };
    this.showMiningModel = true;
    this.showLiquidInfo = false;
    this.selectCoin = coin;
    this.toCoin.id = coin;
    console.log('$$$$');
    this.liquidContent = this.withdrawContent;
  }

  async closeMiningToken(event) {
    console.log(event);
    this.showMiningModel = false;
    this.liquidContent = this.liquidContent_origin;
  }

  canShowZeroInfo() {
    if (!this.pairAttended[this.toCoin.id]) {
      this.showZeroInfo = true;
      this.tokenName = 'XTokens-gray';
      this.questionImgName = 'question-gray';

      let content = document.getElementById('minningPool');
      if (content) {
        this.rd.addClass(content, 'no-mining');
      }
      let tokenInfo = document.getElementById('tokenInfo');
      if (content) {
        this.rd.addClass(tokenInfo, 'no-mining');
      }
    } else {
      this.tokenName = 'XTokens';
      this.questionImgName = 'question';
      let content = document.getElementById('minningPool');
      if (content) {
        this.rd.removeClass(content, 'no-mining');
      }
      let tokenInfo = document.getElementById('tokenInfo');
      if (content) {
        this.rd.removeClass(tokenInfo, 'no-mining');
      }
      this.showZeroInfo = false;
    }
    return this.showZeroInfo;
  }
  havMining() {
    return !this.pairAttended[this.toCoin.id];
  }
  showAlert(content, event) {
    this.utils.showAlert('', content, event);
  }
}
