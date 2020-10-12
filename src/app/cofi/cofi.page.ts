import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ProfitPage } from '../common/components/profit/profit.page';
import { ERC20BalancePipe } from '../common/pipes/erc20balance.pipe';
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
  @ViewChild(ProfitPage, { static: false }) cofiProfit: ProfitPage;
  public cofixContent: BannerContent = {
    title: 'cofix_title',
    descriptions: ['cofix_desc1'],
    more: {
      text: 'cofix_more',
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
  isApproved = false;
  constructor(
    private cofixService: CofiXService,
    private earnedRatePipe: ERC20BalancePipe,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.getCoFiTokenAndRewards();
        this.getIsApproved();
      }, 3000);
    } else {
      this.getCoFiTokenAndRewards();
      this.getIsApproved();
    }
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
      this.todoValue = await this.earnedRatePipe.transform(
        await this.cofixService.getERC20Balance(
          this.shareState.tokenPairAddress[this.coin]
        )
      );
      this.earnedRate = await this.cofixService.earnedCofiAndRewardRate(
        this.shareState.stakingPoolAddress[this.coin]
      );
      this.canReceive =
        (await this.earnedRatePipe.transform(this.earnedRate.earned)) != '--';

      this.hadValue = await this.earnedRatePipe.transform(
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
    this.getIsApproved();
    this.cofiProfit._balance = '';
  }

  //领取Cofi
  async withdrawEarnedCoFi() {
    if (this.shareState.stakingPoolAddress[this.coin]) {
      this.isLoading = true;
      this.cofixService
        .withdrawEarnedCoFi(this.shareState.stakingPoolAddress[this.coin])
        .then((tx: any) => {
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading = false;
            this.getCoFiTokenAndRewards();
          });
          provider.once('error', (error) => {
            this.isLoading = false;
          });
        })
        .catch((error) => {
          this.isLoading = false;
        });
    }
  }

  async getIsApproved() {
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.isApproved = await this.cofixService.approved(
        this.shareState.tokenPairAddress[this.coin],
        this.shareState.stakingPoolAddress[this.coin]
      );
    }
  }

  async approveCofi(event) {
    if (!this.isApproved) {
      this.isLoadingProfit.sq = true;
      await this.cofixService
        .approve(
          this.shareState.tokenPairAddress[this.coin],
          this.shareState.stakingPoolAddress[this.coin]
        )
        .then((tx: any) => {
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoadingProfit.sq = false;
            this.getIsApproved();
          });
          provider.once('error', (error) => {
            console.log(error);
            this.isLoadingProfit.sq = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingProfit.sq = false;
        });
    }
  }

  async saveCofi(event) {
    this.isLoadingProfit.cr = true;
    this.cofixService
      .depositXToken(
        this.shareState.stakingPoolAddress[this.coin],
        this.shareState.tokenPairAddress[this.coin],
        event.balance
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.cr = false;
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
        });
        provider.once('error', (error) => {
          console.log(error);
          this.isLoadingProfit.cr = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoadingProfit.cr = false;
      });
  }

  async receiveCofi(event) {
    this.isLoadingProfit.qc = true;
    this.cofixService
      .withdrawDepositedXToken(
        this.shareState.stakingPoolAddress[this.coin],
        event.balance
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.qc = false;
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
        });
        provider.once('error', (error) => {
          console.log(error);
          this.isLoadingProfit.qc = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoadingProfit.qc = false;
      });
  }
}
