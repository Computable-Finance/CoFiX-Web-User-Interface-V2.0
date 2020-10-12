import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CoinSelectPage } from './select/coin-select.page';

@Component({
  selector: 'app-coin-input',
  templateUrl: './coin-input.page.html',
  styleUrls: ['./coin-input.page.scss'],
})
export class CoinInputPage implements OnInit, OnDestroy {
  modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  debounceTime = 500;

  @Output() onMaxClick = new EventEmitter<any>();
  @Output() onChangeCoin = new EventEmitter<any>();
  @Output() onInputChange = new EventEmitter<any>();
  @Input() amount: any;
  @Input() coin: string;
  @Input() isDropDown: boolean = true;
  @Input() showSelect = true;
  @Input() placeHolder: string = '0.0';
  @Input() maxAmount: any;
  @Input() isShowError: boolean = false;
  @Input() isInsufficientError: boolean = false;
  @Input() maxLiquid: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
        // distinctUntilChanged(),
        switchMap((event) => {
          this.onInputChange.emit({ amount: this.amount, coin: this.coin });
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
          this.onChangeCoin.emit({ coin: this.coin });
        }
      });
    } else {
      return false;
    }
  }

  setMax() {
    this.onMaxClick.emit({ coin: this.coin });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  overLiquid() {
    return Number(this.amount) > Number(this.maxLiquid);
  }
}
