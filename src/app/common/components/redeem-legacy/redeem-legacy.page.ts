import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-redeem-legacy',
  templateUrl: './redeem-legacy.page.html',
  styleUrls: ['./redeem-legacy.page.scss'],
})
export class RedeemLegacyPage implements OnInit {
  constructor(private modalController: ModalController) {}
  private resizeSubscription: Subscription;

  moreDetailTitle: string = 'more_details';
  coinList = ['USDT', 'HBTC'];
  balance = { USDT: 12.12345678, HBTC: 11.222 };
  ngOnInit() {}
  close() {
    this.modalController.dismiss();
  }

  canNotRedeem(i) {
    return i > 0;
  }
}
