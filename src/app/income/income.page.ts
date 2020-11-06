import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/operators';

import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { TxService } from '../state/tx/tx.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit, OnDestroy {
  public incomeContent: BannerContent = {
    title: 'help_tips',
    descriptions: ['income_desc1', 'income_desc2', 'income_desc3'],
    more: {
      text: 'income_more',
      url: 'https://github.com/Computable-Finance/Doc',
    },
  };

  cofiTokenAddress: string;
  cofiStakingRewards: string;
  cofiToken: string;
  cofiStakingRewardsAddress: string;
  earnedETH: string;
  canReceive = false;
  isLoading = false;
  balance = '';
  isLoadingProfit = { sq: false, cr: false, qc: false };
  profitCoin = 'CoFi';
  isApproved = false;
  incomeError = { isError: false, msg: '' };
  receiveError = { isError: false, msg: '' };
  isShowModal = false;
  profit = { title: '', subtitle: '', isDeposit: false };
  cardTitle = { title: '' };
  buttonTitle = {
    deposit: 'income_deposit_btn',
    withdraw: 'income_withdraw_btn',
  };

  private resizeSubscription: Subscription;
  private dividendSubscription: Subscription;
  private cofiBalanceSubscription: Subscription;
  private cofiStakingRewardsSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.initPage();
      }, 3000);
    } else {
      this.initPage();
    }
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.dividendSubscription?.unsubscribe();
    this.cofiBalanceSubscription?.unsubscribe();
    this.cofiStakingRewardsSubscription?.unsubscribe();
  }

  changeButtonTitle() {
    if (window.innerWidth < 500) {
      this.buttonTitle = {
        deposit: 'income_deposit_btn_short',
        withdraw: 'income_withdraw_btn_short',
      };
      this.cardTitle.title = this.profit.title + '_short';
    } else {
      this.buttonTitle = {
        deposit: 'income_deposit_btn',
        withdraw: 'income_withdraw_btn',
      };
      this.cardTitle.title = this.profit.title;
    }
  }

  initPage() {
    this.resetReceiveError();
    this.getCoFiTokenAndRewardsAndSubscribe();
    this.getIsApproved();
    this.changeButtonTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeButtonTitle();
      });
  }

  async getCoFiTokenAndRewardsAndSubscribe() {
    if (this.cofixService.getCurrentAccount()) {
      this.cofiTokenAddress = this.cofixService.getCurrentContractAddressList().CoFiToken;
      this.cofiToken = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiTokenAddress)
      );
      this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.cofiTokenAddress
        )
        .subscribe(async (balance) => {
          this.cofiToken = await this.balanceTruncatePipe.transform(balance);
        });

      this.cofiStakingRewardsAddress = this.cofixService.getCurrentContractAddressList().CoFiStakingRewards;
      this.cofiStakingRewards = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiStakingRewardsAddress)
      );
      this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.cofiStakingRewardsAddress
        )
        .subscribe(async (balance) => {
          this.cofiStakingRewards = await this.balanceTruncatePipe.transform(
            balance
          );
        });

      this.getEarnedETHAndSubscribe();
    }
  }

  async getEarnedETHAndSubscribe() {
    this.earnedETH = await this.cofixService.earnedETH();
    if (!this.dividendSubscription) {
      this.balancesQuery
        .currentDividendBalance$(this.cofixService.getCurrentAccount())
        .subscribe(async (dividend) => {
          this.earnedETH = dividend;
          this.canReceive =
            (await this.balanceTruncatePipe.transform(this.earnedETH)) !==
              '0' &&
            (await this.balanceTruncatePipe.transform(this.earnedETH)) !== '--';
        });
    }
  }

  async receiveETH() {
    this.resetReceiveError();
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    const params = {
      t: 'tx_claimETH',
      p: { e: this.earnedETH },
    };
    console.log(params);
    this.cofixService
      .withdrawEarnedETH()
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);

        this.isLoading = true;
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
          this.isLoading = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoading = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        if (error.message.indexOf('User denied') > -1) {
          this.waitingPopover.dismiss();
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

  async getIsApproved() {
    if (this.cofixService.getCurrentAccount()) {
      this.isApproved = await this.cofixService.approved(
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards
      );
    }
  }

  async approveCofi(event) {
    this.resetIncomeError();
    if (!this.isApproved) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoadingProfit,
        this.incomeError,
        this,
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards,
        'CoFi'
      );
    }
  }

  async saveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .depositCoFi(event.balance)
      .then((tx: any) => {
        this.isLoadingProfit.cr = true;
        const params = {
          t: 'tx_depositCoFi',
          p: { d: event.balance },
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
          this.isLoadingProfit.cr = false;
          this.isShowModal = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoadingProfit.cr = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoadingProfit.cr = false;
        if (error.message.indexOf('User denied') > -1) {
          this.waitingPopover.dismiss();
          this.utils.showTXRejectModal();
        } else {
          this.incomeError = { isError: true, msg: error.message };
        }
      });
  }

  waitingPopover: any;

  async receiveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .withdrawDepositedCoFi(event.balance)
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);

        this.isLoadingProfit.qc = true;
        const params = {
          t: 'tx_withdrawCoFi',
          p: { w: event.balance },
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
          this.isLoadingProfit.qc = false;
          this.isShowModal = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoadingProfit.qc = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoadingProfit.qc = false;
        if (error.message.indexOf('User denied') > -1) {
          this.waitingPopover.dismiss();
          this.utils.showTXRejectModal();
        } else {
          this.incomeError = { isError: true, msg: error.message };
        }
      });
  }

  showModal(type) {
    console.log(this.incomeError);
    this.isShowModal = true;
    this.resetIncomeError();

    if (type === 'withdraw') {
      this.profit = {
        title: 'income_withdraw_title',
        subtitle: 'income_withdraw_subtitle',
        isDeposit: false,
      };
    } else {
      this.profit = {
        title: 'income_deposit_title',
        subtitle: 'income_deposit_subtitle',
        isDeposit: true,
      };
    }
    this.changeButtonTitle();
  }

  cancel() {
    this.isShowModal = false;
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
