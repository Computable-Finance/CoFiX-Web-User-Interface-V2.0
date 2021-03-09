import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAIRSWITCH_TOKENS } from '../../constants';

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
    let index = PAIRSWITCH_TOKENS.indexOf(this.coin) ;
    this.coin=(index+1) < PAIRSWITCH_TOKENS.length?PAIRSWITCH_TOKENS[index+1]:PAIRSWITCH_TOKENS[0]
    this.changeCoin.emit({ coin: this.coin });
  }
}
