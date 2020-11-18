import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CofiXService } from 'src/app/service/cofix.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage {
  constructor(
    private popoverController: PopoverController,
    private cofixService: CofiXService
  ) {}

  close() {
    this.popoverController.dismiss();
  }

  async connect() {
    await this.cofixService.connectWallet();
    this.popoverController.dismiss({ connected: true });
  }
}
