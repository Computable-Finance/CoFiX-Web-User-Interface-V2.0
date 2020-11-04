import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { ShareState } from 'src/app/common/state/share.store';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxService } from 'src/app/state/tx/tx.service';
import { ProfitPage } from '../profit/profit.page';

@Component({
  selector: 'app-token-mining',
  templateUrl: './mining.page.html',
  styleUrls: ['./mining.page.scss'],
})
export class TokenMiningPage implements OnInit, OnDestroy {
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
  shareState: ShareState;
  canReceive = false;
  isLoading = false;
  isLoadingProfit = { sq: false, cr: false, qc: false };
  balance: string = '';
  profitCoin = 'XTokens';
  isApproved = false;
  cofiError = { isError: false, msg: '' };
  withdrawError = { isError: false, msg: '' };
  private resizeSubscription: Subscription;
  cardTitle = {
    title: '',
    subtitle: '',
  };
  waitingPopover: any;
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils,
    private txService: TxService
  ) {}

  ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.refreshPage();
      }, 3000);
    } else {
      this.refreshPage();
    }
    this.changeCartTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeCartTitle();
      });
  }
  changeCartTitle() {
    if (window.innerWidth < 500) {
      this.cardTitle = {
        title: this.profit.title + '_short',
        subtitle: this.profit.subtitle,
      };
    } else {
      this.cardTitle = {
        title: this.profit.title,
        subtitle: this.profit.subtitle,
      };
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
    this.getIsApproved();
    this.cofiProfitView.resetInputSubscription();
    this.cofiProfitView._balance = '';
    this.resetCofiError();
  }

  resetCofiError() {
    this.cofiError = { isError: false, msg: '' };
    this.withdrawError = { isError: false, msg: '' };
  }
  async getIsApproved() {
    if (this.cofixService.getCurrentAccount()) {
      this.isApproved = await this.cofixService.approved(
        await this.cofixService.getPairAddressByToken(this.coinAddress),
        await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
      );
    }
  }

  async approveCofi(event) {
    if (!this.isApproved) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoadingProfit,
        this.cofiError,
        this,
        await this.cofixService.getPairAddressByToken(this.coinAddress),
        await this.cofixService.getStakingPoolAddressByToken(this.coinAddress),
        'XTokens Mining Pool'
      );
    }
  }

  async saveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .depositXToken(
        await this.cofixService.getStakingPoolAddressByToken(this.coinAddress),
        await this.cofixService.getPairAddressByToken(this.coinAddress),
        event.balance
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);

        this.isLoadingProfit.cr = true;
        const params = {
          t: 'tx_depositMining',
          p: {
            d: event.balance,
          },
        };
        console.log(params);
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
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
          this.txService.txSucceeded(tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoadingProfit.cr = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log('catch==', error);
        console.log(error.code);
        this.isLoadingProfit.cr = false;
        if (error.message.indexOf('User denied') > -1) {
          this.waitingPopover.dismiss();
          this.utils.showTXRejectModal();
        } else {
          this.cofiError = { isError: true, msg: error.message };
        }
      });
  }

  async receiveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .withdrawDepositedXToken(
        await this.cofixService.getStakingPoolAddressByToken(this.coinAddress),
        event.balance
      )
      .then((tx: any) => {
        this.isLoadingProfit.qc = true;
        const params = {
          t: 'tx_widthdrawMining',
          p: {
            w: event.balance,
          },
        };
        console.log(params);
        this.txService.add(
          tx.hash,
          this.cofixService.getCurrentAccount(),
          JSON.stringify(params),
          this.cofixService.getCurrentNetwork()
        );

        console.log('tx.hash', tx.hash);
        this.waitingPopover.dismiss();
        this.utils.showTXSubmitModal(tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoadingProfit.qc = false;
          this.getCoFiTokenAndRewards();
          this.balance = undefined;
          this.txService.txSucceeded(tx.hash);
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
          this.cofiError = { isError: true, msg: error.message };
        }
      });
  }
  isDeposit: boolean = false;

  cancel() {
    this.onClose.emit();
  }
  ngOnDestroy() {
    console.log('destroy---');
    this.resizeSubscription.unsubscribe();
  }
}
