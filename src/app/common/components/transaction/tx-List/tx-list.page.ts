import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

@Component({
  selector: 'app-tx-list',
  templateUrl: './tx-list.page.html',
  styleUrls: ['./tx-list.page.scss'],
})
export class TxListPage implements OnInit, OnDestroy {
  txList: any;
  txListSubscription: Subscription;

  constructor(
    private txQuery: TxQuery,
    private popoverController: PopoverController,
    public cofixService: CofiXService,
    private translate: TranslateService
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
  }

  close() {
    this.popoverController.dismiss();
  }

  goto(txHash, network) {
    let url = '';
    switch (network) {
      case 3:
        url = 'https://ropsten.etherscan.io';
        break;
      case 1:
        url = 'https://etherscan.io';
        break;
    }
    window.open(`${url}/tx/${txHash}`);
  }

  ngOnDestroy(): void {
    this.txListSubscription?.unsubscribe();
  }
}
