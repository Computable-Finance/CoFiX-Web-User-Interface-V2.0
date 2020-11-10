import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {
  constructor(
    private popoverController: PopoverController,
    private cofixService: CofiXService
  ) {}
  ngOnInit() {}

  close() {
    this.popoverController.dismiss();
  }
  async connect() {
    await this.cofixService.connectWallet();
    this.popoverController.dismiss({ connected: true });
  }
}
