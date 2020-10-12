import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LiquidSelectPage } from './select/liquid-select.page';

@Component({
  selector: 'app-liquid-input',
  templateUrl: './liquid-input.page.html',
  styleUrls: ['./liquid-input.page.scss'],
})
export class LiquidInputPage implements OnInit {
  @Output() onChangeCoin = new EventEmitter<any>();
  @Input() coin: string = 'USDT';
  @Input() isDropDown: boolean = true;
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {}
  ngOnInit() {}
  async selectAddType(event: any) {
    const modal = await this.modalController.create({
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
        this.onChangeCoin.emit({ coin: this.coin });
      }
    });
  }
}
