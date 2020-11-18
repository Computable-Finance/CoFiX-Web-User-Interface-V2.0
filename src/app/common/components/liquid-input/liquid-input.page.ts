import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LiquidSelectPage } from './select/liquid-select.page';

@Component({
  selector: 'app-liquid-input',
  templateUrl: './liquid-input.page.html',
  styleUrls: ['./liquid-input.page.scss'],
})
export class LiquidInputPage implements OnInit {
  @Output() changeCoin = new EventEmitter<any>();
  @Input() coin: string = 'USDT';
  @Input() isDropDown: boolean = true;
  constructor(private modalController: ModalController) {}
  ngOnInit() {}
  async selectAddType(event: any) {
    /*const modal = await this.modalController.create({
      component: LiquidSelectPage,
      componentProps: { selectedCoin: this.coin },
      cssClass: 'popover-liquidselect',
      animated: false,
      keyboardClose: false,
    });
    await modal.present();
    modal.onDidDismiss().then((selectCoin) => {
      if (selectCoin.data !== null && selectCoin.data !== undefined) {
        this.coin = selectCoin.data;
        this.changeCoin.emit({ coin: this.coin });
      }
    });*/
    if (this.coin === 'USDT') {
      this.coin = 'HBTC';
    } else {
      this.coin = 'USDT';
    }
    this.changeCoin.emit({ coin: this.coin });
  }
}
