import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CoinInputPage } from '../coin-input/coin-input.page';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.page.html',
  styleUrls: ['./profit.page.scss'],
})
export class ProfitPage implements OnInit {
  @ViewChild(CoinInputPage, { static: false }) coinInputView: CoinInputPage;
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
  isSaveTab = true;
  showSelect = false;
  showError = false;
  shoWErrorLabel = '';

  constructor() {}

  ngOnInit() {}

  resetInputSubscription() {
    this.coinInputView.resetSubscription();
  }
  resetTransactionError() {
    this.transcationError = { isError: false, msg: '' };
  }
  swapTab(type) {
    if (type === 'deposit') {
      this.isSaveTab = true;
    } else {
      this.isSaveTab = false;
    }

    this.balance = '';
    this.showError = false;
    this.resetTransactionError();
  }

  setCoinMax() {
    if (this.isSaveTab) {
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
      Number(this.balance) > 0 &&
      Number(this.balance) <= Number(this.todoValue)
    );
  }

  canReceive() {
    return (
      Number(this.balance) > 0 && Number(this.balance) <= Number(this.hadValue)
    );
  }

  canShowError() {
    if (this.isSaveTab) {
      this.shoWErrorLabel = this.todoLabel + '_error';
      this.showError = Number(this.balance) > Number(this.todoValue);
    } else {
      this.shoWErrorLabel = this.hadLabel + '_error';
      this.showError = Number(this.balance) > Number(this.hadValue);
    }
  }
}
