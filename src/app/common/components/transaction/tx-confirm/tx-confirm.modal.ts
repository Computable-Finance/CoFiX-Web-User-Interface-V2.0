import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tx-confirm',
  templateUrl: './tx-confirm.modal.html',
  styleUrls: ['./tx-confirm.modal.scss'],
})
export class TxConfirmModal {
  constructor(private popoverController: PopoverController) {}

  close() {
    this.popoverController.dismiss();
  }
}
