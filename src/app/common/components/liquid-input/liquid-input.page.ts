import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-liquid-input',
  templateUrl: './liquid-input.page.html',
  styleUrls: ['./liquid-input.page.scss'],
})
export class LiquidInputPage implements OnInit {
  @Output() changeCoin = new EventEmitter<any>();
  @Input() coin: string = 'USDT';
  constructor(private modalController: ModalController) {}
  ngOnInit() {}
  async selectAddType(event: any) {
    if (this.coin === 'USDT') {
      this.coin = 'HBTC';
    } else {
      this.coin = 'USDT';
    }
    this.changeCoin.emit({ coin: this.coin });
  }
}
