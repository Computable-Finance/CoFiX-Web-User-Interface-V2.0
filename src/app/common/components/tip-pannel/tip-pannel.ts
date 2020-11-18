import { Component, Input } from '@angular/core';

export interface TipPannelContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-tip-pannel',
  templateUrl: './tip-pannel.html',
  styleUrls: ['./tip-pannel.scss'],
})
export class TipPannel {
  @Input() tipPannelContent: TipPannelContent;

  isShowDetail = false;

  constructor() {}

  goto(link: string) {
    window.open(link);
  }

  showDetailClick(event) {
    this.isShowDetail = event.isDown;
  }
}
