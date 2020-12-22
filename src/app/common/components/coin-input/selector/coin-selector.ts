import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TOKENS } from 'src/app/common/constants';

@Component({
  selector: 'app-coin-selector',
  templateUrl: './coin-selector.html',
  styleUrls: ['./coin-selector.scss'],
})
export class CoinSelector {
  coinList = TOKENS;
  token: string;

  constructor(private modalController: ModalController) {}

  selectCoin(coin) {
    this.modalController.dismiss(coin);
  }

  close() {
    this.modalController.dismiss();
  }

  searchToken(event) {
    if (!this.token.toUpperCase()) {
      this.coinList = TOKENS;
    } else {
      this.coinList = TOKENS.filter(
        (el) => el.indexOf(this.token.toUpperCase()) > -1
      );
    }
  }
}
