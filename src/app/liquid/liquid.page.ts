import { Component, OnInit } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ERC20BalancePipe } from '../common/pipes/erc20balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { CoinContent } from '../swap/swap.page';

@Component({
  selector: 'app-liquid',
  templateUrl: './liquid.page.html',
  styleUrls: ['./liquid.page.scss'],
})
export class LiquidPage implements OnInit {
  public liquidContent: BannerContent = {
    title: 'liquid_title',
    descriptions: ['liquid_desc1', 'liquid_desc2'],
    more: {
      text: 'liquid_more',
      url: 'https://cofix.io/doc/CoFiX_White_Paper.pdf',
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
  constructor(
    private cofixService: CofiXService,
    private erc20balancePipe: ERC20BalancePipe,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.initCoinContent();
      }, 3000);
    } else {
      this.initCoinContent();
    }
  }

  async setExpectedXToken() {
    this.expectedXToken = (
      await this.cofixService.expectedXToken(
        this.toCoin.address,
        Number(this.fromCoin.amount),
        Number(this.toCoin.amount)
      )
    ).toString();
  }

  addLiquid(coin) {
    this.showAddModel = true;
    this.showRedemtionModel = false;
    this.showLiquidInfo = false;
    this.selectCoin = coin;
    this.toCoin.id = coin;
  }
  async closeAddLiquid(event) {
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

      if (
        !this.shareState.tokenPairAddress[this.toCoin.id] ||
        !this.shareState.stakingPoolAddress[this.toCoin.id]
      ) {
        await this.utils.updateShareAddress(this.shareState);
      }

      this.coinList.forEach(async (coinItem) => {
        this.todoValue[coinItem] = await this.erc20balancePipe.transform(
          await this.cofixService.getERC20Balance(
            this.shareState.tokenPairAddress[coinItem]
          )
        );
        this.hadValue[coinItem] = await this.erc20balancePipe.transform(
          await this.cofixService.getERC20Balance(
            this.shareState.stakingPoolAddress[coinItem]
          )
        );
        this.NAVPerShare[coinItem] = await this.cofixService.getNAVPerShare(
          this.cofixService.getCurrentContractAddressList()[coinItem],
          this.shareState.tokenPairAddress[coinItem]
        );

        this.earnedRate[
          coinItem
        ] = await this.cofixService.earnedCofiAndRewardRate(
          this.shareState.stakingPoolAddress[coinItem]
        );
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
}
