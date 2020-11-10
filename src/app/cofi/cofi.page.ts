import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateService } from '../common/state/share.service';
import { ShareState } from '../common/state/share.store';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { MarketDetailsQuery } from '../state/market/market.query';
import { TxService } from '../state/tx/tx.service';

@Component({
  selector: 'app-cofi',
  templateUrl: './cofi.page.html',
  styleUrls: ['./cofi.page.scss'],
})
export class CofiPage implements OnInit, OnDestroy {
  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    private txService: TxService,
    private utils: Utils,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery
  ) {}

  public cofixContent: BannerContent = {
    title: 'help_tips',
    descriptions: ['cofix_desc1', 'cofix_desc2', 'cofix_desc3'],
    more: {
      text: 'read_more',
      url:
        'https://github.com/Computable-Finance/Doc#7-token-mining-incentive-system',
    },
  };

  showInputSelect = false;
  coin = 'USDT';
  coinAddress: string;
  cofiBalance: string;
  earnedRate: any;
  todoValue: string;
  hadValue: string;
  shareState: ShareState;
  canReceive = false;
  isLoading = { sq: false, qc: false };
  balance = '';
  profitCoin = 'XTokens';
  withdrawError = { isError: false, msg: '' };
  isDeposit = true;
  currentCoFiPrice;
  waitingPopover: any;
  isApproved = false;
  resizeSubscription: Subscription;
  claimTitle: string = 'claimcofi_text';
  private earnedRateSubscription: Subscription;
  private cofiBalanceSubscription: Subscription;
  private hadValueSubscription: Subscription;
  private todoValueSubscription: Subscription;

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.resizeSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.setBtnTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.setBtnTitle();
      });
    if (this.cofixService.getCurrentAccount()) {
      this.refreshPage();
    }
    setTimeout(async () => {
      this.currentCoFiPrice = await this.cofixService.currentCoFiPrice();
    }, 500);

    setInterval(
      async () =>
        (this.currentCoFiPrice = await this.cofixService.currentCoFiPrice()),
      60 * 1000 * 30
    );
  }

  ionViewWillEnter() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      this.showConnectModal();
    }
  }

  async showConnectModal() {
    const popover = await this.utils.showConnectModal();
    await popover.present();
    popover.onDidDismiss().then((res: any) => {
      if (res?.data?.connected) {
        this.refreshPage();
      }
    });
  }

  setBtnTitle() {
    if (window.innerWidth < 470) {
      this.claimTitle = 'claimcofi_text_short';
    } else {
      this.claimTitle = 'claimcofi_text';
    }
  }
  private unsubscribeAll() {
    this.earnedRateSubscription?.unsubscribe();
    this.cofiBalanceSubscription?.unsubscribe();
    this.hadValueSubscription?.unsubscribe();
    this.todoValueSubscription?.unsubscribe();
  }

  refreshPage() {
    this.todoValue = '';
    this.hadValue = '';
    this.getCoFiTokenAndRewards();
    this.getIsApproved();
    this.resetCofiError();
  }

  gotoLiquid() {
    this.shareStateService.updateActiveTab('liquid');
  }

  async getCoFiTokenAndRewards() {
    this.unsubscribeAll();
    this.coinAddress = this.cofixService.getCurrentContractAddressList()[
      this.coin
    ];

    if (this.cofixService.getCurrentAccount()) {
      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getCurrentContractAddressList().CoFiToken
        )
      );
      this.todoValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getCurrentContractAddressList().CoFiToken
        )
        .subscribe(async (balance) => {
          this.todoValue = await this.balanceTruncatePipe.transform(balance);
        });

      const result = await this.cofixService.earnedCofiAndRewardRate(
        this.coinAddress
      );

      this.earnedRate = result.rewardRate;
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
          this.canReceive =
            this.cofiBalance !== '--' && this.cofiBalance !== '0';
        });

      this.earnedRateSubscription = this.marketDetailsQuery
        .marketDetails$(this.coinAddress, 'rewardRate')
        .subscribe((data) => (this.earnedRate = data));

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
      );
      this.hadValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
        .subscribe(async (balance) => {
          this.hadValue = await this.balanceTruncatePipe.transform(balance);
        });
    } else {
      this.earnedRate = (
        await this.cofixService.earnedCofiAndRewardRate(this.coinAddress)
      ).rewardRate;

      this.earnedRateSubscription = this.marketDetailsQuery
        .marketDetails$(this.coinAddress, 'rewardRate')
        .subscribe((data) => (this.earnedRate = data));
    }
  }

  changeCoin(event) {
    this.coin = event.coin;

    this.refreshPage();
  }

  async withdrawEarnedCoFi() {
    this.resetCofiError();
    if (
      await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
    ) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.cofixService
        .withdrawEarnedCoFi(
          await this.cofixService.getStakingPoolAddressByToken(
            this.coinAddress
          ),
          this.isDeposit
        )
        .then((tx: any) => {
          this.isLoading.qc = true;
          const params = {
            t: 'tx_claimCoFi',
            p: { w: this.cofiBalance },
          };
          this.txService.add(
            tx.hash,
            this.cofixService.getCurrentAccount(),
            JSON.stringify(params),
            this.cofixService.getCurrentNetwork()
          );
          this.waitingPopover.dismiss();
          this.utils.showTXSubmitModal(tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.qc = false;
            this.balance = undefined;
            this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.qc = false;
            this.txService.txFailed(tx.hash);
          });
        })
        .catch((error) => {
          this.isLoading.qc = false;
          this.waitingPopover.dismiss();
          if (error.message.indexOf('User denied') > -1) {
            this.utils.showTXRejectModal();
          } else {
            this.withdrawError = { isError: true, msg: error.message };
          }
        });
    }
  }

  resetCofiError() {
    this.withdrawError = { isError: false, msg: '' };
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }

  async getIsApproved() {
    if (this.cofixService.getCurrentAccount()) {
      this.isApproved = await this.cofixService.approved(
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards
      );
    }
  }

  canWithdraw() {
    return (
      this.isLoading.qc ||
      (!this.canReceive && !(this.isDeposit && this.isApproved))
    );
  }

  async approve() {
    this.resetCofiError();
    if (!this.isApproved && this.isDeposit) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoading,
        this.withdrawError,
        this,
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards,
        'CoFi'
      );
    }
  }
}
