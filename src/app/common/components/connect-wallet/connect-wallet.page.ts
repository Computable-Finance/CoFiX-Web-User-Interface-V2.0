import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

import { Utils } from '../../utils';
import { TxListPage } from '../transaction/tx-List/tx-list.page';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.page.html',
  styleUrls: ['./connect-wallet.page.scss'],
})
export class ConnectWalletPage implements OnDestroy {
  @Output() onConnected = new EventEmitter<any>();
  isConnectLoading = false;
  constructor(
    public cofixService: CofiXService,
    private utils: Utils,
    private txQuery: TxQuery,
    private popoverController: PopoverController
  ) {}
  pendingCount = 0;
  txLastPendingSubscription: Subscription;

  subscribeIfNot() {
    if (
      this.cofixService.getCurrentAccount() &&
      !this.txLastPendingSubscription
    ) {
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

  async connect() {
    this.isConnectLoading = true;
    await this.cofixService.connectWallet().catch((err) => {
      this.isConnectLoading = false;
    });
    this.utils.getPairAttended();
    this.isConnectLoading = false;
    this.onConnected.emit();
  }

  showPending() {
    this.subscribeIfNot();
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
