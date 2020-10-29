import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { ProfitPage } from '../profit/profit.page';

@Component({
  selector: 'app-token-mining',
  templateUrl: './mining.page.html',
  styleUrls: ['./mining.page.scss'],
})
export class TokenMiningPage implements OnInit {
  @ViewChild(ProfitPage, { static: false }) cofiProfitView: ProfitPage;
  @Input() profit: any = { title: '', subtitle: '', isDeposit: false };
  @Output() onClose = new EventEmitter<any>();
  @Input() miningSpeed: any;
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
  cofiError = { isError: false, msg: '' };
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
    this.getIsApproved();
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
    this.getIsApproved();
    this.cofiProfitView.resetInputSubscription();
    this.cofiProfitView._balance = '';
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
    this.cofiError = { isError: false, msg: '' };
    this.withdrawError = { isError: false, msg: '' };
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
      this.utils.approveHandler(
        this.isLoadingProfit,
        this.cofiError,
        this,
        this.shareState.tokenPairAddress[this.coin],
        this.shareState.stakingPoolAddress[this.coin]
      );
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
          console.log('provider.once==', error);
          this.isLoadingProfit.cr = false;
        });
      })
      .catch((error) => {
        console.log('catch==', error);
        console.log(error.code);
        this.cofiError = { isError: true, msg: error.message };
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
          console.log('provider.once==', error);
          this.isLoadingProfit.qc = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.cofiError = { isError: true, msg: error.message };
        this.isLoadingProfit.qc = false;
      });
  }
  isDeposit: boolean = false;

  async showAlert(title, content) {
    this.utils.showAlert(title, content);
  }
  cancel() {
    this.onClose.emit();
  }
}
