import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tx-confirm',
  templateUrl: './tx-confirm.page.html',
  styleUrls: ['./tx-confirm.page.scss'],
})
export class TxConfirmPage implements OnInit {
  constructor(private popoverController: PopoverController) {}
  ngOnInit() {}

  close() {
    this.popoverController.dismiss();
  }
}
