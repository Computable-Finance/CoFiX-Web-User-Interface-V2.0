import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-arrow-button',
  templateUrl: './arrow-button.html',
  styleUrls: ['./arrow-button.scss'],
})
export class ArrowButton {
  @Input() isDown: boolean;
  @Output() arrowChanged = new EventEmitter<any>();

  constructor() {}

  changeArrow() {
    this.isDown = !this.isDown;
    this.arrowChanged.emit({ isDown: this.isDown });
  }
}
