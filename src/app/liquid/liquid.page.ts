import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TipPannelContent } from '../common/components/tip-pannel/tip-pannel';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { CoinContent } from '../common/types/CoinContent';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { EventBusService } from '../service/eventbus.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { MarketDetailsQuery } from '../state/market/market.query';
import { SettingsQuery } from '../state/setting/settings.query';
import { SettingsService } from '../state/setting/settings.service';
import { AddLiquidPage } from './add/add-liquid.page';
import { TokenMiningPage } from './mining/mining.page';
import { RedeemLiquidPage } from './redeem/redeem-liquid.page';
import { WarningDetailPage } from './warning/warning-detail/warning-detail.page';

@Component({
  selector: 'app-liquid',
  templateUrl: './liquid.page.html',
  styleUrls: ['./liquid.page.scss'],
})
export class LiquidPage implements OnInit, OnDestroy {
  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    public settingsQuery: SettingsQuery,
    private utils: Utils,
    private modalController: ModalController,
    private settingsService: SettingsService,
    private rd: Renderer2,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery,
    private eventbusService: EventBusService
  ) {
    this.liquidContent_origin = this.liquidContent;
  }

  @ViewChild(AddLiquidPage, { static: false }) addLiquidView: AddLiquidPage;
  @ViewChild(RedeemLiquidPage, { static: false })
  redeemLiquidView: RedeemLiquidPage;
  @ViewChild(TokenMiningPage, { static: false })
  tokenDepositView: TokenMiningPage;

  public liquidContent: TipPannelContent = {
    title: 'liquid_title',
    descriptions: ['liquid_desc1', 'liquid_desc2', 'liquid_desc3'],
    more: {
      text: 'read_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };

  withdrawContent: TipPannelContent = {
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

  lpwithdrawContent: TipPannelContent = {
    title: 'help_tips',
    descriptions: [
      'liquidpool_withdraw_help_desc1',
      'liquidpool_withdraw_help_desc2',
      'liquidpool_withdraw_help_desc3',
    ],
    more: {
      text: 'read_more',
      url: 'https://github.com/Computable-Finance/Doc#4-market-maker-mechanism',
    },
  };

  liquidContent_origin: TipPannelContent;

  fromCoin: CoinContent = {
    id: 'ETH',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };

  toCoin: CoinContent = {
    id: 'USDT',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };

  xtValue = 'XT-1';
  isChecked = true;
  expectedXToken: string;
  earnedRate = { USDT: '', HBTC: '' };
  coinAddress: string;
  todoValue = { USDT: '', HBTC: '' };
  hadValue = { USDT: '', HBTC: '' };

  ETHAmountForRemoveLiquidity = { USDT: '', HBTC: '' };
  tokenAmountForRemoveLiquidity = { USDT: '', HBTC: '' };
  nAVPerShareForBurn = { USDT: '', HBTC: '' };
  showAddModel = false;
  showLiquidInfo = false;
  isRotate = { USDT: false, HBTC: false };
  showRedemtionModel = false;
  pairAttended = { USDT: false, HBTC: false };
  coinList = ['USDT', 'HBTC'];
  selectCoin: string;
  colSize = '7';
  miningProfit = { title: '', subtitle: '', isDeposit: false };
  showZeroInfo = false;
  tokenName = 'XTokens-gray';
  questionImgName = 'question';
  resizeSubscription: Subscription;
  btnTitle: any;
  showMiningModel = false;

  cofiBalance: string;

  private earnedRateSubscription: Subscription;
  private cofiBalanceSubscription: Subscription;
  private hadValueSubscription: Subscription;
  private todoValueSubscription: Subscription;
  private eventbusSubscription: Subscription;

  ngOnInit() {
    this.changeBtnTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeBtnTitle();
      });
    this.eventbusSubscription = this.eventbusService.on(
      'wallet_connected',
      () => {
        this.refreshPage();
      }
    );
  }

  ionViewWillEnter() {
    setTimeout(() => {
      if (this.cofixService.getCurrentAccount() === undefined) {
        this.showConnectModal();
      } else {
        this.showWarning();
        this.initCoinContent();
      }
    }, 500);
  }
  async showConnectModal() {
    const popover = await this.utils.showConnectModal();
    await popover.present();
    popover.onDidDismiss().then((res: any) => {
      if (res?.data?.connected) {
        this.showWarning();
        this.initCoinContent();
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.eventbusSubscription?.unsubscribe();
    this.unsubscribeAll();
  }

  private unsubscribeAll() {
    this.earnedRateSubscription?.unsubscribe();
    this.cofiBalanceSubscription?.unsubscribe();
    this.hadValueSubscription?.unsubscribe();
    this.todoValueSubscription?.unsubscribe();
  }

  changeBtnTitle() {
    if (window.innerWidth < 500) {
      this.btnTitle = {
        deposit: 'miningpool_deposit_title_short',
        withdraw: 'miningpool_withdraw_title_short',
      };
    } else {
      this.btnTitle = {
        deposit: 'miningpool_deposit',
        withdraw: 'miningpool_withdraw',
      };
    }
  }

  async showWarning() {
    const knownRisk = this.settingsQuery.knownRisk();
    console.log(knownRisk);
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
          this.settingsService.updateKnownRisk(data.data.knownRisk);
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

  async getPairAttended() {
    this.pairAttended[this.toCoin.id] = await this.cofixService.pairAttended(
      this.coinAddress
    );
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedXToken = '';
    this.coinAddress = this.cofixService.getCurrentContractAddressList()[
      this.toCoin.id
    ];

    this.unsubscribeAll();
    if (this.cofixService.getCurrentAccount()) {
      const result = await this.cofixService.earnedCofiAndRewardRate(
        this.coinAddress
      );

      this.earnedRate[this.toCoin.id] = result.rewardRate;
      this.cofiBalance = await this.balanceTruncatePipe.transform(
        result.earned
      );

      this.cofiBalanceSubscription = this.balancesQuery
        .currentUnclaimedCoFi$(
          this.cofixService.getCurrentAccount(),
          this.coinAddress
        )
        .subscribe(async (balance) => {
          this.cofiBalance = await this.balanceTruncatePipe.transform(balance);
        });

      this.earnedRateSubscription = this.marketDetailsQuery
        .marketDetails$(this.coinAddress, 'rewardRate')
        .subscribe((data) => (this.earnedRate[this.toCoin.id] = data));

      await this.getPairAttended();

      const pairAddress = await this.cofixService.getPairAddressByToken(
        this.cofixService.getCurrentContractAddressList()[this.toCoin.id]
      );
      this.todoValue[this.toCoin.id] = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(pairAddress)
      );
      this.todoValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          pairAddress
        )
        .subscribe(async (balance) => {
          this.todoValue[
            this.toCoin.id
          ] = await this.balanceTruncatePipe.transform(balance);

          const resultETH = await this.cofixService.getETHAmountForRemoveLiquidity(
            this.coinAddress,
            pairAddress,
            this.todoValue[this.toCoin.id] || '0'
          );
          this.ETHAmountForRemoveLiquidity[this.toCoin.id] = resultETH.result;
          this.nAVPerShareForBurn[this.toCoin.id] =
            resultETH.nAVPerShareForBurn;
          const resultToken = await this.cofixService.getTokenAmountForRemoveLiquidity(
            this.coinAddress,
            pairAddress,
            this.todoValue[this.toCoin.id] || '0'
          );
          this.tokenAmountForRemoveLiquidity[this.toCoin.id] =
            resultToken.result;
        });

      const stakingPoolAddress = await this.cofixService.getStakingPoolAddressByToken(
        this.cofixService.getCurrentContractAddressList()[this.toCoin.id]
      );
      this.hadValue[this.toCoin.id] = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(stakingPoolAddress)
      );
      this.hadValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          stakingPoolAddress
        )
        .subscribe(async (balance) => {
          this.hadValue[
            this.toCoin.id
          ] = await this.balanceTruncatePipe.transform(balance);
        });
    } else {
      this.earnedRate[this.toCoin.id] = (
        await this.cofixService.earnedCofiAndRewardRate(this.coinAddress)
      ).rewardRate;

      this.earnedRateSubscription = this.marketDetailsQuery
        .marketDetails$(this.coinAddress, 'rewardRate')
        .subscribe((data) => (this.earnedRate[this.toCoin.id] = data));
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
    this.liquidContent = this.withdrawContent;
  }

  async closeMiningToken(event) {
    this.showMiningModel = false;
    this.liquidContent = this.liquidContent_origin;
  }

  canShowZeroInfo() {
    if (!this.pairAttended[this.toCoin.id]) {
      this.showZeroInfo = true;
      this.tokenName = 'XTokens-gray';
      this.questionImgName = 'question-gray';

      const content = document.getElementById('minningPool');
      if (content) {
        this.rd.addClass(content, 'no-mining');
      }
      const tokenInfo = document.getElementById('tokenInfo');
      if (content) {
        this.rd.addClass(tokenInfo, 'no-mining');
      }
    } else {
      this.tokenName = 'XTokens';
      this.questionImgName = 'question';
      const content = document.getElementById('minningPool');
      if (content) {
        this.rd.removeClass(content, 'no-mining');
      }
      const tokenInfo = document.getElementById('tokenInfo');
      if (content) {
        this.rd.removeClass(tokenInfo, 'no-mining');
      }
      this.showZeroInfo = false;
    }
    return this.showZeroInfo;
  }

  havMining() {
    return (
      !this.pairAttended[this.toCoin.id] ||
      !this.cofixService.getCurrentAccount()
    );
  }
}
