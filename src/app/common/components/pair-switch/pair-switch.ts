import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pair-switch',
  templateUrl: './pair-switch.html',
  styleUrls: ['./pair-switch.scss'],
})
export class PairSwitch {
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
