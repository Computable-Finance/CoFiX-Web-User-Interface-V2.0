import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tx-status',
  templateUrl: './tx-status.page.html',
  styleUrls: ['./tx-status.page.scss'],
})
export class TxStatusPage implements OnInit {
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
    let url = '';
    switch (this.network) {
      case 3:
        url = 'https://ropsten.etherscan.io';
        break;
      case 1:
        url = 'https://etherscan.io';
        break;
    }
    window.open(`${url}/tx/${this.txHash}`);
  }
}
