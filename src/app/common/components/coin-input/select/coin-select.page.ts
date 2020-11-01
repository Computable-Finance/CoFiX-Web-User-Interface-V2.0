import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TOKENS } from 'src/app/common/constants';

@Component({
  selector: 'app-coin-select',
  templateUrl: './coin-select.page.html',
  styleUrls: ['./coin-select.page.scss'],
})
export class CoinSelectPage implements OnInit {
  coinList = TOKENS;

  constructor(private modalController: ModalController) {}
  ngOnInit() {}
  selectCoin(coin) {
    this.modalController.dismiss(coin);
  }
  close() {
    this.modalController.dismiss();
  }
}
