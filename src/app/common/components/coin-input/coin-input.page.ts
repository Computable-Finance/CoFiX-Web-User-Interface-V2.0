import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { CoinSelectPage } from './select/coin-select.page';

const BNJS = require('bignumber.js');
@Component({
  selector: 'app-coin-input',
  templateUrl: './coin-input.page.html',
  styleUrls: ['./coin-input.page.scss'],
})
export class CoinInputPage implements OnInit, OnDestroy {
  modelChanged: Subject<string> = new Subject<string>();
  subscription: Subscription;
  debounceTime = 250;

  @Output() clickMax = new EventEmitter<any>();
  @Output() changeCoin = new EventEmitter<any>();
  @Output() changeValue = new EventEmitter<any>();
  @Input() amount: string;
  @Input() coin: string;
  @Input() isDropDown = true;
  @Input() showSelect = true;
  @Input() placeHolder = '0.0';
  @Input() maxAmount: string;
  @Input() isShowError = false;
  @Input() maxLiquid: string;
  @Input() isInsufficientError = false;
  @Input() isShowBlance = false;
  @Input() isShowMax = true;
  @Input() disabled = false;
  @Input() label = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
        switchMap((event) => {
          this.changeValue.emit({ amount: this.amount, coin: this.coin });
          return EMPTY;
        })
      )
      .subscribe();
  }

  async showCoinSelect(event: any) {
    if (this.isDropDown) {
      const modal = await this.modalController.create({
        component: CoinSelectPage,
        componentProps: { selectedCoin: this.coin },
        cssClass: 'popover-coinselect',
        animated: false,
        keyboardClose: false,
      });
      await modal.present();
      modal.onDidDismiss().then((selectCoin) => {
        if (selectCoin.data !== null && selectCoin.data !== undefined) {
          this.coin = selectCoin.data;
          this.changeCoin.emit({ coin: this.coin });
        }
      });
    } else {
      return false;
    }
  }

  setMax() {
    this.clickMax.emit({ coin: this.coin });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  overLiquid() {
    return new BNJS(this.amount).gt(new BNJS(this.maxLiquid));
  }

  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
