import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { txLink } from 'src/app/common/uitils/common-funcs';

@Component({
  selector: 'app-tx-status',
  templateUrl: './tx-status.modal.html',
  styleUrls: ['./tx-status.modal.scss'],
})
export class TxStatusModal implements OnInit {
  @Input() txHash: string;
  @Input() network: number;
  title = 'tx_rejected';
  desc = 'tx_rejected_desc';

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    if (this.txHash) {
      this.title = 'tx_submitted';
      this.desc = 'tx_submitted_desc';
    }
  }

  close() {
    this.popoverController.dismiss();
  }

  goto() {
    window.open(txLink(this.network, this.txHash));
  }
}
