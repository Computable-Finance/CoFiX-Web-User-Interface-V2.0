import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CofiXService } from 'src/app/service/cofix.service';

@Component({
  selector: 'app-connect-modal',
  templateUrl: './connect-modal.html',
  styleUrls: ['./connect-modal.scss'],
})
export class ConnectModal {
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
