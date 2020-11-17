import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-arrow',
  templateUrl: './select-arrow.page.html',
  styleUrls: ['./select-arrow.page.scss'],
})
export class SelectArrowPage {
  @Input() isDown: boolean;
  @Output() arrowChanged = new EventEmitter<any>();

  constructor() {}

  changeArrow() {
    this.isDown = !this.isDown;
    this.arrowChanged.emit({ isDown: this.isDown });
  }
}
