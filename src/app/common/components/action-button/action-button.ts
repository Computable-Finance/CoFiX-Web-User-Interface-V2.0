import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.html',
  styleUrls: ['./action-button.scss'],
})
export class ActionButton {
  @Input() btnId: string;
  @Input() btnTitle: string;
  @Input() isEnabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() isOutline: boolean = false;
  @Input() isApprove: boolean = false;
  @Output() clickAction = new EventEmitter<any>();

  constructor() {}

  action() {
    this.clickAction.emit();
  }
}
