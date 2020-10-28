import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface BannerContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-select-arrow',
  templateUrl: './select-arrow.page.html',
  styleUrls: ['./select-arrow.page.scss'],
})
export class SelectArrowPage implements OnInit {
  @Input() isDown: boolean;
  @Output() onArrowChange = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {}
  select() {
    this.isDown = !this.isDown;
    this.onArrowChange.emit({ isDown: this.isDown });
  }
}
