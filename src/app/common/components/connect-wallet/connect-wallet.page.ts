import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CofiXService } from 'src/app/service/cofix.service';

import { Utils } from '../../utils';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.page.html',
  styleUrls: ['./connect-wallet.page.scss'],
})
export class ConnectWalletPage implements OnInit {
  @Output() onConnected = new EventEmitter<any>();
  isConnectLoading = false;
  constructor(public cofixService: CofiXService, private utils: Utils) {}
  ngOnInit() {}

  async connect() {
    this.isConnectLoading = true;
    await this.cofixService.connectWallet().catch((err) => {
      console.log(err);
      this.isConnectLoading = false;
    });
    this.utils.getPairAttended();
    this.isConnectLoading = false;
    this.onConnected.emit();
  }
}
