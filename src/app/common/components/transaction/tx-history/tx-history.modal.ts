import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { txLink } from 'src/app/common/uitils/common-funcs';
import { CofiXService } from 'src/app/service/cofix.service';
import { SettingsService } from 'src/app/state/setting/settings.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

@Component({
  selector: 'app-tx-history',
  templateUrl: './tx-history.modal.html',
  styleUrls: ['./tx-history.modal.scss'],
})
export class TxHistoryModal implements OnInit, OnDestroy {
  txList: any;
  txListSubscription: Subscription;
  canDisConnection: boolean;

  constructor(
    private txQuery: TxQuery,
    private popoverController: PopoverController,
    public cofixService: CofiXService,
    private translate: TranslateService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.txListSubscription = this.txQuery
      .tx$(
        this.cofixService.getCurrentAccount(),
        this.cofixService.getCurrentNetwork()
      )
      .subscribe((res) => {
        this.txList = res;
        this.txList.forEach(async (item) => {
          const params = JSON.parse(item.activity);
          item.title = await this.translate.get(params.t, params.p).toPromise();
        });
      });
    this.canDisConnection = this.isWebBrowser();
  }

  isWebBrowser() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return !(isAndroid || isiOS);
  }
  close() {
    this.popoverController.dismiss();
  }

  goto(txHash, network) {
    window.open(txLink(network, txHash));
  }

  ngOnDestroy() {
    this.txListSubscription?.unsubscribe();
  }

  disconnect() {
    if (this.cofixService.isWalletConnect()) {
      this.cofixService.disconnectWalletConnect().then(() => {
        this.popoverController.dismiss();
      });
    } else {
      this.settingsService.updateMetamaskDisconnectedByUser(true);
      this.popoverController.dismiss();
      location.reload();
    }
  }
}
