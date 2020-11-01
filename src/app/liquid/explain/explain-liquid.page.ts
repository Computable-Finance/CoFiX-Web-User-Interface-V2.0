import { Component, Input, OnInit } from '@angular/core';
import { Utils } from 'src/app/common/utils';

@Component({
  selector: 'app-explain-liquid',
  templateUrl: './explain-liquid.page.html',
  styleUrls: ['./explain-liquid.page.scss'],
})
export class ExplainLiquidPage implements OnInit {
  @Input() todoValue: string;
  @Input() hadValue: string;
  @Input() NAVPerShare: string;

  @Input('coin')
  set coin(value: string) {
    this._coin = value;
    if (this.coin === 'USDT') {
      this.xtValue = 'XT-1';
    } else {
      this.xtValue = 'XT-2';
    }
  }
  _coin: string;
  get coin(): string {
    return this._coin;
  }

  xtValue: string = 'XT-1';

  oracleCost = 0.01;
  constructor(private utils: Utils) {}

  ngOnInit() {}

  async showAlert(content, event) {
    this.utils.showAlert('', content, event);
  }
}
