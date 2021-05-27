import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import BNJS from 'bignumber.js/bignumber';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoinInput } from 'src/app/common/components/coin-input/coin-input';

@Component({
  selector: 'app-cofi-card',
  templateUrl: './cofi-card.html',
})
export class CofiCard implements OnInit, OnDestroy {
  @ViewChild(CoinInput, { static: false }) coinInputView: CoinInput;
  @Input() todoLabel: string;
  @Input() hadLabel: string;
  @Input() totalETHInDividendPool: string;
  @Input() cofiETHPrice: string;
  @Input() ethBalance: string;
  @Input() isApproved = false;
  @Input() isLoading: any;
  @Output() onApprove = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onRecieve = new EventEmitter<any>();
  @Output() onSetCoinMax = new EventEmitter<any>();
  @Output() onCoinInputChange = new EventEmitter<any>();
  @Input() transcationError = { isError: false, msg: '' };
  @Input() profitCoin: any;
  @Input() coin: any = 'USDT';
  @Input() isMore = false;

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
  isSelectCoin = false;
  showError = false;
  buttonTitle = 'qc';
  private resizeSubscription: Subscription;
  constructor() {}

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
    this.showError = new BNJS(this.balance).gt(new BNJS(this.todoValue));
  }
  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
