import { Component, OnDestroy, OnInit } from '@angular/core';
import BNJS from 'bignumber.js';
import { Subscription } from 'rxjs';
import { TipPannelContent } from '../common/components/tip-pannel/tip-pannel';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { isValidNumberForTx } from '../common/uitils/bignumber-utils';
import { Utils } from '../common/utils';
import { CofiXLegacyService } from '../service/cofix-legacy.service';
import { CofiXService } from '../service/cofix.service';
import { EventBusService } from '../service/eventbus.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { TxService } from '../state/tx/tx.service';

@Component({
  selector: 'app-dividend-info',
  templateUrl: './dividend-info.page.html',
  styleUrls: ['./dividend-info.page.scss'],
})
export class DividendInfoPage implements OnInit, OnDestroy {
  public incomeContent: TipPannelContent = {
    title: 'help_tips',
    descriptions: ['income_desc1', 'income_desc2', 'income_desc3'],
    more: {
      text: 'income_more',
      url:
        'https://github.com/Computable-Finance/Doc#75-cofi-token-dividend-and-repurchase-model',
    },
  };

  cofiTokenAddress: string;
  cofiStakingRewards: string;
  cofiToken: string;
  cofiStakingRewardsAddress: string;
  //shareInDividendPool: string;
  //totalETHFromSwapFees: string;
  //totalETHInDividendPool: string;
  // ethTotalClaimed: string;
  earnedETH: string;
  isETHLoading = false;
  isCofiLoading = false;
  profitCoin = 'CoFi';
  isApproved = false;
  incomeError = { isError: false, msg: '' };
  receiveError = { isError: false, msg: '' };

  private resizeSubscription: Subscription;
  private dividendSubscription: Subscription;
  private cofiBalanceSubscription: Subscription;
  private cofiStakingRewardsSubscription: Subscription;
  private eventbusSubscription: Subscription;

  constructor(
    public cofixLegacyService: CofiXLegacyService,
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private eventbusService: EventBusService
  ) {}

  async ngOnInit() {
    this.eventbusSubscription = this.eventbusService.on(
      'connection_changed',
      () => {
        this.initPage();
      }
    );
  }
  ionViewWillEnter() {
    setTimeout(() => {
      if (this.cofixService.getCurrentAccount()) {
        this.initPage();
      } else {
        this.showConnectModal();
      }
    }, 500);
  }

  async showConnectModal() {
    const popover = await this.utils.showConnectModal();
    await popover.present();
    popover.onDidDismiss().then((res: any) => {
      if (res?.data?.connected) {
        this.initPage();
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.dividendSubscription?.unsubscribe();
    this.cofiBalanceSubscription?.unsubscribe();
    this.cofiStakingRewardsSubscription?.unsubscribe();
    this.eventbusSubscription?.unsubscribe();
  }

  initPage() {
    this.resetReceiveError();
    this.getCoFiTokenAndRewardsAndSubscribe();
    //this.getIsApproved();
  }

  async getCoFiTokenAndRewardsAndSubscribe() {
    this.cofiTokenAddress = this.cofixLegacyService.getCurrentContractAddressList().CoFiToken;
    this.cofiToken = await this.balanceTruncatePipe.transform(
      await this.cofixLegacyService.getERC20Balance(this.cofiTokenAddress)
    );

    if (!this.cofiBalanceSubscription) {
      this.cofiBalanceSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.cofiTokenAddress
        )
        .subscribe(async (balance) => {
          this.cofiToken = await this.balanceTruncatePipe.transform(balance);
        });
    }

    this.cofiStakingRewardsAddress = this.cofixLegacyService.getCurrentContractAddressList().CoFiStakingRewards;
    this.cofiStakingRewards = await this.balanceTruncatePipe.transform(
      await this.cofixLegacyService.getERC20Balance(
        this.cofiStakingRewardsAddress
      )
    );
    // this.shareInDividendPool = await this.balanceTruncatePipe.transform(
    //   await this.cofixLegacyService.shareInDividendPool()
    // );
    // this.totalETHFromSwapFees = await this.balanceTruncatePipe.transform(
    //   await this.cofixLegacyService.totalETHFromSwapFees()
    // );
    // this.totalETHInDividendPool = await this.balanceTruncatePipe.transform(
    //   await this.cofixLegacyService.totalETHInDividendPool()
    // );

    if (!this.cofiStakingRewardsSubscription) {
      this.cofiStakingRewardsSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.cofiStakingRewardsAddress
        )
        .subscribe(async (balance) => {
          this.cofiStakingRewards = await this.balanceTruncatePipe.transform(
            balance
          );
          // this.shareInDividendPool = await this.balanceTruncatePipe.transform(
          //   await this.cofixLegacyService.shareInDividendPool()
          // );
          // this.totalETHFromSwapFees = await this.balanceTruncatePipe.transform(
          //   await this.cofixLegacyService.totalETHFromSwapFees()
          // );
          // this.totalETHInDividendPool = await this.balanceTruncatePipe.transform(
          //   await this.cofixLegacyService.totalETHInDividendPool()
          // );
        });
    }

    this.getEarnedETHAndSubscribe();
  }

  async getEarnedETHAndSubscribe() {
    this.earnedETH = await this.cofixLegacyService.earnedETH();
    if (!this.dividendSubscription) {
      this.dividendSubscription = this.balancesQuery
        .currentDividendBalance$(this.cofixService.getCurrentAccount())
        .subscribe(async (dividend) => {
          this.earnedETH = dividend;
        });
    }
  }

  earned() {
    return isValidNumberForTx(this.earnedETH);
  }

  earnedCofi() {
    return isValidNumberForTx(this.cofiStakingRewards);
  }

  async receiveETH() {
    this.resetReceiveError();
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    const params = {
      t: 'tx_claimETH',
      p: { e: this.earnedETH },
    };

    this.cofixLegacyService
      .withdrawEarnedETH()
      .then((tx: any) => {
        this.isETHLoading = true;
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
          this.isETHLoading = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          this.isETHLoading = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        this.isETHLoading = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.receiveError = { isError: true, msg: error.message };
        }
      });
  }

  resetReceiveError() {
    this.receiveError = { isError: false, msg: '' };
  }

  resetIncomeError() {
    this.incomeError = { isError: false, msg: '' };
  }

  // async getIsApproved() {
  //   if (this.cofixService.getCurrentAccount()) {
  //     this.isApproved = await this.cofixLegacyService.approved(
  //       this.cofixLegacyService.getCurrentContractAddressList().CoFiToken,
  //       this.cofixLegacyService.getCurrentContractAddressList()
  //         .CoFiStakingRewards
  //     );
  //   }
  // }

  // async approveCofi(event) {
  //   this.resetIncomeError();
  //   if (!this.isApproved) {
  //     this.waitingPopover = await this.utils.createTXConfirmModal();
  //     await this.waitingPopover.present();
  //     this.utils.approveHandler(
  //       this.isLoadingProfit,
  //       this.incomeError,
  //       this,
  //       this.cofixLegacyService.getCurrentContractAddressList().CoFiToken,
  //       this.cofixLegacyService.getCurrentContractAddressList()
  //         .CoFiStakingRewards,
  //       'CoFi'
  //     );
  //   }
  // }

  waitingPopover: any;

  async receiveCofi() {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixLegacyService
      .withdrawDepositedCoFi(this.cofiStakingRewards)
      .then((tx: any) => {
        this.isCofiLoading = true;
        const params = {
          t: 'tx_withdrawCoFi',
          p: { w: new BNJS(this.cofiStakingRewards) },
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
          this.isCofiLoading = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          this.isCofiLoading = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        this.isCofiLoading = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.incomeError = { isError: true, msg: error.message };
        }
      });
  }
}
