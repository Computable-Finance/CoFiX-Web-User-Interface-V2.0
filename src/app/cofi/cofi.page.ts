import { Component, OnInit } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { ShareStateService } from '../common/state/share.service';
import { ShareState } from '../common/state/share.store';
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
  shareState: ShareState;
  canReceive = false;
  isLoading = false;
  isLoadingProfit = { sq: false, cr: false, qc: false };
  balance: string = '';
  profitCoin = 'XTokens';
  withdrawError = { isError: false, msg: '' };
  isDeposit: boolean = false;
  constructor(
    public cofixService: CofiXService,
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
      this.canReceive =
        (await this.balanceTruncatePipe.transform(this.earnedRate.earned)) !==
        '--';

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
    if (
      await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
    ) {
      this.isLoading = true;
      this.cofixService
        .withdrawEarnedCoFi(
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
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
  async showAlert(content, event) {
    this.utils.showAlert('', content, event);
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
