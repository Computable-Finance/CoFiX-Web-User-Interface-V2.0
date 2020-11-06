import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { ShareStateService } from 'src/app/common/state/share.service';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { BalancesQuery } from 'src/app/state/balance/balance.query';
import { TxService } from 'src/app/state/tx/tx.service';

import { ProfitPage } from '../profit/profit.page';

const BNJS = require('bignumber.js');
@Component({
  selector: 'app-token-mining',
  templateUrl: './mining.page.html',
  styleUrls: ['./mining.page.scss'],
})
export class TokenMiningPage implements OnInit, OnDestroy {
  constructor(
    private cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery
  ) {}

  @ViewChild(ProfitPage, { static: false }) cofiProfitView: ProfitPage;
  @Input() profit: any = { title: '', subtitle: '', isDeposit: false };
  @Output() onClose = new EventEmitter<any>();
  @Input() miningSpeed: any;

  showInputSelect = false;
  coin = 'USDT';
  coinAddress: string;
  todoValue: string;
  hadValue: string;
  isLoadingProfit = { sq: false, cr: false, qc: false };
  balance = '';
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
  isDeposit = false;

  private todoValueSubscription: Subscription;
  private hadValueSubscription: Subscription;

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

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.todoValueSubscription?.unsubscribe();
    this.hadValueSubscription?.unsubscribe();
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
    this.todoValueSubscription?.unsubscribe();
    this.hadValueSubscription?.unsubscribe();

    if (this.cofixService.getCurrentAccount()) {
      this.coinAddress = this.cofixService.getCurrentContractAddressList()[
        this.coin
      ];

      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getPairAddressByToken(this.coinAddress)
        )
      );
      this.todoValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getPairAddressByToken(this.coinAddress)
        )
        .subscribe(async (balance) => {
          this.todoValue = await this.balanceTruncatePipe.transform(balance);
        });

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
      );
      this.hadValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getStakingPoolAddressByToken(this.coinAddress)
        )
        .subscribe(async (balance) => {
          this.hadValue = await this.balanceTruncatePipe.transform(balance);
        });
    }
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
    this.resetCofiError();
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
            d: new BNJS(event.balance),
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
          this.balance = undefined;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          this.onClose.emit();
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
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
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
            w: new BNJS(event.balance),
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
          this.balance = undefined;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          this.onClose.emit();
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
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.cofiError = { isError: true, msg: error.message };
        }
      });
  }

  cancel() {
    this.onClose.emit();
  }
}
