import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error.modal.html',
  styleUrls: ['./error.modal.scss'],
})
export class ErrorModal {
  constructor(private popoverController: PopoverController) {}

  close() {
    this.popoverController.dismiss();
  }
}
