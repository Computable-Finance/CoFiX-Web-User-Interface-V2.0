import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-liquid-input',
  templateUrl: './liquid-input.page.html',
  styleUrls: ['./liquid-input.page.scss'],
})
export class LiquidInputPage {
  @Output() changeCoin = new EventEmitter<any>();
  @Input() coin = 'USDT';

  constructor() {}

  switch() {
    if (this.coin === 'USDT') {
      this.coin = 'HBTC';
    } else {
      this.coin = 'USDT';
    }
    this.changeCoin.emit({ coin: this.coin });
  }
}
