import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoinInputPage } from 'src/app/common/components/coin-input/coin-input.page';

const BNJS = require('bignumber.js');
@Component({
  selector: 'app-income-profit',
  templateUrl: './profit.page.html',
  styleUrls: ['./profit.page.scss'],
})
export class IncomeProfitPage implements OnInit, OnDestroy {
  @ViewChild(CoinInputPage, { static: false }) coinInputView: CoinInputPage;
  @Input() todoLabel: string;
  @Input() hadLabel: string;
  @Input() isApproved: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() onApprove = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onRecieve = new EventEmitter<any>();
  @Output() onSetCoinMax = new EventEmitter<any>();
  @Output() onCoinInputChange = new EventEmitter<any>();
  @Input() transcationError = { isError: false, msg: '' };
  @Input() profitCoin: any;
  @Input() coin: any = 'USDT';
  @Input() isMore: boolean = false;

  @Input('balance')
  set balance(value: string) {
    this._balance = value;
  }
  _balance: string;
  get balance(): string {
    return this._balance;
  }

  @Input('todoValue')
  set todoValue(value: string) {
    this._todoValue = value;
  }
  _todoValue: string;
  get todoValue(): string {
    return this._todoValue;
  }
  _hadValue: string;
  get hadValue(): string {
    return this._hadValue;
  }

  @Input('hadValue')
  set hadValue(value: string) {
    this._hadValue = value;
  }
  @Input() isDeposit: boolean;
  showSelect = false;
  showError = false;
  shoWErrorLabel = '';
  buttonTitle = 'qc';
  private resizeSubscription: Subscription;
  constructor(private rd: Renderer2) {}

  ngOnInit() {
    this.changeButtonTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeButtonTitle();
      });
  }
  changeButtonTitle() {
    if (window.innerWidth < 500) {
      this.buttonTitle = 'qc_short';
    } else {
      this.buttonTitle = 'qc';
    }
  }
  resetInputSubscription() {
    this.coinInputView.resetSubscription();
  }
  resetTransactionError() {
    this.transcationError = { isError: false, msg: '' };
  }

  setCoinMax() {
    if (this.isDeposit) {
      this.balance = this.todoValue;
    } else {
      this.balance = this.hadValue;
    }
    this.showError = false;
    this.resetTransactionError();
    this.onSetCoinMax.emit();
  }

  approve() {
    this.resetTransactionError();
    this.onApprove.emit({ balance: this.balance });
  }

  save() {
    this.resetTransactionError();
    this.onSave.emit({ balance: this.balance });
  }

  recieve() {
    this.resetTransactionError();
    this.onRecieve.emit({ balance: this.balance });
  }

  coinInput(event) {
    this.balance = event.amount;
    this.canShowError();
    this.resetTransactionError();
    this.onCoinInputChange.emit();
  }

  canSave() {
    return (
      this.isApproved &&
      new BNJS(this.balance).gt(0) &&
      new BNJS(this.balance).lte(new BNJS(this.todoValue))
    );
  }

  canReceive() {
    return (
      new BNJS(this.balance).gt(0) &&
      new BNJS(this.balance).lte(new BNJS(this.hadValue))
    );
  }

  canShowError() {
    if (this.isDeposit) {
      this.shoWErrorLabel = this.todoLabel + '_error';
      this.showError = new BNJS(this.balance).gt(new BNJS(this.todoValue));
    } else {
      this.shoWErrorLabel = this.hadLabel + '_error';
      this.showError = new BNJS(this.balance).gt(new BNJS(this.hadValue));
    }
  }
  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
