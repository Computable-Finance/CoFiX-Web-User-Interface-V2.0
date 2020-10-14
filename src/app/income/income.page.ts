import { Component, OnInit } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ERC20BalancePipe } from '../common/pipes/erc20balance.pipe';
import { ShareStateQuery } from '../common/state/share.query';
import { CofiXService } from '../service/cofix.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  public incomeContent: BannerContent = {
    title: 'income_title',
    descriptions: ['income_desc1'],
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
  constructor(
    private cofixService: CofiXService,
    private erc20balancePipe: ERC20BalancePipe,
    public shareStateQuery: ShareStateQuery
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
      this.cofiToken = await this.erc20balancePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiTokenAddress)
      );
      this.cofiStakingRewards = await this.erc20balancePipe.transform(
        await this.cofixService.getERC20Balance(this.cofiStakingRewardsAddress)
      );
      this.getEarnedETH();
    }
    this.balance = '';
  }

  async getEarnedETH() {
    this.earnedETH = await this.cofixService.earnedETH();
    this.canReceive =
      (await this.erc20balancePipe.transform(this.earnedETH)) !== '0' &&
      (await this.erc20balancePipe.transform(this.earnedETH)) !== '--';
  }

  //领取ETH
  async receiveETH() {
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
        this.isLoading = false;
      });
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
      this.isLoadingProfit.sq = true;
      this.cofixService
        .approve(
          this.cofixService.getCurrentContractAddressList().CoFiToken,
          this.cofixService.getCurrentContractAddressList().CoFiStakingRewards
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoadingProfit.sq = false;
            this.getIsApproved();
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
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
      .depositCoFi(event.balance)
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.cr = false;
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
        this.isLoadingProfit.qc = false;
      });
  }
}
