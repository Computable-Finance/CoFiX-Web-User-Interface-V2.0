import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TOKENS } from 'src/app/common/constants';

@Component({
  selector: 'app-coin-select',
  templateUrl: './coin-select.page.html',
  styleUrls: ['./coin-select.page.scss'],
})
export class CoinSelectPage {
  coinList = TOKENS;

  constructor(private modalController: ModalController) {}

  selectCoin(coin) {
    this.modalController.dismiss(coin);
  }

  close() {
    this.modalController.dismiss();
  }
}
