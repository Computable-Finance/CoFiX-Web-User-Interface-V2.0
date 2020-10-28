import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
  }
  refreshPage() {
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

  async showAlert(title, content) {
    const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get(title).toPromise(),
      message: await this.translateService.get(content).toPromise(),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();
  }
  isShowModal: boolean = false;
  profit = { title: '', subtitle: '', isDeposit: false };
  showModal(type) {
    this.isShowModal = true;
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
  }

  cancel(type) {
    console.log(type);
    this.isShowModal = false;
  }
}
