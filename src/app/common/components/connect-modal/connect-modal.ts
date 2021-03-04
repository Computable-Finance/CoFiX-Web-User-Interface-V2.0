import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { Utils } from '../../utils';

@Component({
  selector: 'app-connect',
  templateUrl: './connect-modal.html',
  styleUrls: ['./connect-modal.scss'],
})
export class ConnectModal implements OnInit, OnDestroy {
  walletList = [
    { id: 'metamask', desc: 'connect_browser' },
    { id: 'wallet-connect', desc: 'connect_walletconnect' },
  ];

  walletType: string;
  web3Provider: WalletConnectProvider;

  constructor(
    private utils: Utils,
    private popoverController: PopoverController,
    private cofixService: CofiXService,
    private eventbusService: EventBusService
  ) {}

  ngOnInit() {}

  close() {
    this.popoverController.dismiss();
  }

  async connect(type) {
    this.walletType = type;
    switch (type) {
      case 'metamask':
        this.cofixService
          .connectWallet()
          .then(() => this.connectListener(type))
          .catch((err) => {
            console.log(err);
            this.walletType = undefined;
          });
        break;
      case 'wallet-connect':
        this.cofixService
          .connectWithWalletConnect(false)
          .then(() => this.connectListener(type))
          .catch((err) => {
            console.log(err);
            this.walletType = undefined;
          });
        break;
    }
  }

  connectListener(type) {
    this.utils.getPairAttended();
    this.cofixService.setConnectType(type);
    this.eventbusService.emit({ name: 'connection_changed' });
    this.popoverController.dismiss({ connected: true });
  }

  ngOnDestroy() {}
}
