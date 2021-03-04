import { Component, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { CurrentAccountQuery } from 'src/app/state/current-account/current-account.query';
import { TxQuery } from 'src/app/state/tx/tx.query';

import { ConnectModal } from '../connect-modal/connect-modal';
import { TxHistoryModal } from '../transaction/tx-history/tx-history.modal';

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
    private txQuery: TxQuery,
    private popoverController: PopoverController,
    public currentAccountQuery: CurrentAccountQuery
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

  async connect() {
    const popover = await this.popoverController.create({
      component: ConnectModal,
      cssClass: 'account-class',
    });
    await popover.present();
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
      component: TxHistoryModal,
      cssClass: 'account-class',
    });
    await popover.present();
  }
}
