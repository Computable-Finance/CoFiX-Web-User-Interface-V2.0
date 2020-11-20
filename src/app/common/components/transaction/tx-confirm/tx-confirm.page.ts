import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tx-confirm',
  templateUrl: './tx-confirm.page.html',
  styleUrls: ['./tx-confirm.page.scss'],
})
export class TxConfirmPage {
  constructor(private popoverController: PopoverController) {}

  close() {
    this.popoverController.dismiss();
  }
}
