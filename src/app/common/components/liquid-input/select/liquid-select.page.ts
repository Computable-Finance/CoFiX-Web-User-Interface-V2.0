import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TOKENS } from 'src/app/common/constants';

@Component({
  selector: 'app-liquid-select',
  templateUrl: './liquid-select.page.html',
  styleUrls: ['./liquid-select.page.scss'],
})
export class LiquidSelectPage implements OnInit {
  coinList = TOKENS;
  @Input() selectedCoin;
  constructor(private modalController: ModalController) {}
  ngOnInit() {}

  selectCoin(coin) {
    this.modalController.dismiss(coin);
  }
  close() {
    this.modalController.dismiss();
  }
}
