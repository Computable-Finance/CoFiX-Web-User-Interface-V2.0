import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

@Component({
  selector: 'app-tx-success',
  templateUrl: './tx-success.page.html',
  styleUrls: ['./tx-success.page.scss'],
})
export class TxSuccessPage implements OnInit {
  @Input() title: string;
  @Input() txHash: string;
  @Input() network: number;
  constructor(private popoverController: PopoverController) {}
  ngOnInit() {}

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
    window.open(url + `/tx/${this.txHash}`);
  }
}
