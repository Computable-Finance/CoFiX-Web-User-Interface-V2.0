import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import BNJS from 'bignumber.js';
import { CoinInput } from 'src/app/common/components/coin-input/coin-input';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.page.html',
})
export class ProfitPage implements OnInit {
  @ViewChild(CoinInput, { static: false }) coinInputView: CoinInput;
  @Input() todoLabel: string;
  @Input() hadLabel: string;
  @Input() isApproved: boolean = false;
  @Input() isLoading: any;
  @Output() onApprove = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onRecieve = new EventEmitter<any>();
  @Output() onSetCoinMax = new EventEmitter<any>();
  @Output() onCoinInputChange = new EventEmitter<any>();
  @Input() transcationError = { isError: false, msg: '' };
  @Input() profitCoin: any;
  @Input() coin: any = 'USDT';
  @Input() miningSpeed: any;

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

  @Input() isDeposit = true;
  isSelectCoin = false;
  showError = false;

  constructor() {}

  ngOnInit() {}

  resetTransactionError() {
    this.transcationError = { isError: false, msg: '' };
  }
  swapTab(type) {
    if (type === 'deposit') {
      this.isDeposit = true;
    } else {
      this.isDeposit = false;
    }

    this.balance = '';
    this.showError = false;
    this.resetTransactionError();
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
      this.showError = new BNJS(this.balance).gt(new BNJS(this.todoValue));
    } else {
      this.showError = new BNJS(this.balance).gt(new BNJS(this.hadValue));
    }
  }
}
