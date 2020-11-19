import { Component, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

import { Utils } from '../../utils';
import { TxListPage } from '../transaction/tx-List/tx-list.page';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.html',
  styleUrls: ['./wallet-button.scss'],
})
export class WalletButton implements OnDestroy {
  isConnectLoading = false;
  pendingCount = 0;
  txLastPendingSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    private utils: Utils,
    private txQuery: TxQuery,
    private popoverController: PopoverController,
    private eventbusService: EventBusService
  ) {}

  subscribe() {
    if (this.cofixService.getCurrentAccount()) {
      this.txLastPendingSubscription?.unsubscribe();
      this.txLastPendingSubscription = this.txQuery
        .pendingTxCount$(
          this.cofixService.getCurrentAccount(),
          this.cofixService.getCurrentNetwork()
        )
        .subscribe((res) => {
          this.pendingCount = res;
        });
    }
  }

  connect() {
    this.isConnectLoading = true;
    this.cofixService
      .connectWallet()
      .then(() => {
        this.utils.getPairAttended();
        this.isConnectLoading = false;
        this.eventbusService.emit({ name: 'wallet_connected' });
      })
      .catch((err) => {
        this.isConnectLoading = false;
      });
  }

  showPending() {
    if (
      !this.txLastPendingSubscription ||
      this.txLastPendingSubscription.closed
    ) {
      this.subscribe();
    }
    return this.pendingCount > 0;
  }

  ngOnDestroy(): void {
    this.txLastPendingSubscription?.unsubscribe();
  }

  async showTXList(ev) {
    const popover = await this.popoverController.create({
      component: TxListPage,
      cssClass: 'account-class',
    });
    await popover.present();
  }
}
