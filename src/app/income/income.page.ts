import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/operators';

import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
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
  shareState: any;
  isLoading = false;
  balance = '';
  isLoadingProfit = { sq: false, cr: false, qc: false };
  profitCoin = 'CoFi';
  isApproved = false;
  incomeError = { isError: false, msg: '' };
  receiveError = { isError: false, msg: '' };
  isShowModal: boolean = false;
  profit = { title: '', subtitle: '', isDeposit: false };
  cardTitle = { title: '' };
  buttonTitle = {
    deposit: 'income_deposit_btn',
    withdraw: 'income_withdraw_btn',
  };
  private resizeSubscription: Subscription;
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    public shareStateQuery: ShareStateQuery,
    private translateService: TranslateService,
    private alertController: AlertController,
    private utils: Utils
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.refreshPage();
      }, 3000);
    } else {
      this.refreshPage();
    }
    this.changeButtonTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeButtonTitle();
      });
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
  refreshPage() {
    this.resetReceiveError();
    this.getCoFiTokenAndRewards();
    this.getIsApproved();
  }
  async getCoFiTokenAndRewards() {
    this.shareState = this.shareStateQuery.getValue();
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.cofiTokenAddress = this.cofixService.getCurrentContractAddressList()[
        'CoFiToken'
      ];
      this.cofiStakingRewardsAddress = this.cofixService.getCurrentContractAddressList()[
        'CoFiStakingRewards'
      ];
      this.cofiToken = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiTokenAddress)
      );
      this.cofiStakingRewards = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiStakingRewardsAddress)
      );
      this.getEarnedETH();
    }
    this.balance = '';
  }

  async getEarnedETH() {
    this.earnedETH = await this.cofixService.earnedETH();
    this.canReceive =
      (await this.balanceTruncatePipe.transform(this.earnedETH)) !== '0' &&
      (await this.balanceTruncatePipe.transform(this.earnedETH)) !== '--';
  }

  //领取ETH
  async receiveETH() {
    this.resetReceiveError();
    this.isLoading = true;
    this.cofixService
      .withdrawEarnedETH()
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoading = false;
          this.getEarnedETH();
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoading = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.receiveError = { isError: true, msg: error.message };
        this.isLoading = false;
      });
  }
  resetReceiveError() {
    this.receiveError = { isError: false, msg: '' };
  }
  resetIncomeError() {
    this.incomeError = { isError: false, msg: '' };
  }
  async getIsApproved() {
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.isApproved = await this.cofixService.approved(
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards
      );
    }
  }

  async approveCofi(event) {
    if (!this.isApproved) {
      this.utils.approveHandler(
        this.isLoadingProfit,
        this.incomeError,
        this,
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiStakingRewards
      );
    }
  }

  async saveCofi(event) {
    this.isLoadingProfit.cr = true;
    this.cofixService
      .depositCoFi(event.balance)
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.cr = false;
          this.isShowModal = false;
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoadingProfit.cr = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.incomeError = { isError: true, msg: error.message };
        this.isLoadingProfit.cr = false;
      });
  }

  async receiveCofi(event) {
    this.isLoadingProfit.qc = true;
    this.cofixService
      .withdrawDepositedCoFi(event.balance)
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.qc = false;
          this.isShowModal = false;
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoadingProfit.qc = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.incomeError = { isError: true, msg: error.message };
        this.isLoadingProfit.qc = false;
      });
  }

  async showAlert(content, event) {
    this.utils.showAlert('', content, event);
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

  cancel(type) {
    console.log(type);
    this.isShowModal = false;
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
