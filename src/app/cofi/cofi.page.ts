import { Component, OnInit } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateService } from '../common/state/share.service';
import { ShareState } from '../common/state/share.store';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { TxService } from '../state/tx/tx.service';

@Component({
  selector: 'app-cofi',
  templateUrl: './cofi.page.html',
  styleUrls: ['./cofi.page.scss'],
})
export class CofiPage implements OnInit {
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
  coin: string = 'USDT';
  coinAddress: string;
  earnedRate: any;
  todoValue: string;
  hadValue: string;
  shareState: ShareState;
  canReceive = false;
  isLoading = { sq: false, qc: false };
  balance: string = '';
  profitCoin = 'XTokens';
  withdrawError = { isError: false, msg: '' };
  isDeposit: boolean = true;
  currentCoFiPrice = '--';
  waitingPopover: any;
  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    private txService: TxService,
    private utils: Utils
  ) {}

  async ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.refreshPage();
      }, 3000);
    } else {
      this.refreshPage();
    }
    this.currentCoFiPrice = await this.cofixService.currentCoFiPrice();
  }
  refreshPage() {
    this.getCoFiTokenAndRewards();
    this.getIsApproved();
  }
  gotoLiquid() {
    this.shareStateService.updateActiveTab('liquid');
  }

  async getCoFiTokenAndRewards() {
    if (this.cofixService.getCurrentAccount()) {
      this.coinAddress = this.cofixService.getCurrentContractAddressList()[
        this.coin
      ];
      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getPairAddressByToken(this.coinAddress)
        )
      );
      this.earnedRate = await this.cofixService.earnedCofiAndRewardRate(
        this.coinAddress
      );
      const cofiBalance = await this.balanceTruncatePipe.transform(
        this.earnedRate.earned
      );
      console.log(
        await this.balanceTruncatePipe.transform(this.earnedRate.earned)
      );
      this.canReceive = cofiBalance !== '--' && cofiBalance !== '0';

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
      );
    }
  }
  changeCoin(event) {
    this.coin = event.coin;
    this.todoValue = '';
    this.hadValue = '';
    this.earnedRate = undefined;
    this.getCoFiTokenAndRewards();
    this.resetCofiError();
  }

  //领取Cofi
  async withdrawEarnedCoFi() {
    this.resetCofiError();
    console.log('this.isDeposit', this.isDeposit);
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
            p: { w: this.earnedRate?.earned },
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
            console.log(transactionReceipt);
            this.isLoading.qc = false;
            this.getCoFiTokenAndRewards();
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
          if (error.message.indexOf('User denied') > -1) {
            this.waitingPopover.dismiss();
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
  isApproved: boolean = false;
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
      (this.isLoading.qc || !this.canReceive) &&
      !(this.isDeposit && this.isApproved)
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
