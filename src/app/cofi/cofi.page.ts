import { Component, OnInit, ViewChild } from '@angular/core';

import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { ShareStateService } from '../common/state/share.service';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';

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
  shareState: any;
  canReceive = false;
  isLoading = false;
  isLoadingProfit = { sq: false, cr: false, qc: false };
  balance: string = '';
  profitCoin = 'XTokens';
  withdrawError = { isError: false, msg: '' };
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
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
  }
  gotoLiquid() {
    this.shareStateService.updateActiveTab('liquid');
  }

  async getCoFiTokenAndRewards() {
    this.shareState = this.shareStateQuery.getValue();
    if (this.shareState.connectedWallet) {
      this.coinAddress = this.cofixService.getCurrentContractAddressList()[
        this.coin
      ];

      if (
        !this.shareState.tokenPairAddress[this.coin] ||
        !this.shareState.stakingPoolAddress[this.coin]
      ) {
        await this.utils.updateShareAddress(this.shareState);
      }
      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          this.shareState.tokenPairAddress[this.coin]
        )
      );
      this.earnedRate = await this.cofixService.earnedCofiAndRewardRate(
        this.shareState.stakingPoolAddress[this.coin]
      );
      this.canReceive =
        (await this.balanceTruncatePipe.transform(this.earnedRate.earned)) !=
        '--';

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          this.shareState.stakingPoolAddress[this.coin]
        )
      );
      this.shareStateService.updateShareStore(this.shareState);
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
    if (this.shareState.stakingPoolAddress[this.coin]) {
      this.isLoading = true;
      this.cofixService
        .withdrawEarnedCoFi(this.shareState.stakingPoolAddress[this.coin])
        .then((tx: any) => {
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading = false;
            this.getCoFiTokenAndRewards();
            this.balance = undefined;
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading = false;
          });
        })
        .catch((error) => {
          this.withdrawError = { isError: true, msg: error.message };
          this.isLoading = false;
        });
    }
  }
  resetCofiError() {
    this.withdrawError = { isError: false, msg: '' };
  }
  async showAlert(title, content) {
    this.utils.showAlert(title, content);
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
