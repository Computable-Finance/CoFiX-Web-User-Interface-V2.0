import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PermissionsService } from 'src/app/state/permission/permission.service';

import { CofiXService } from '../service/cofix.service';
import { TxService } from '../state/tx/tx.service';
import { BalanceTruncatePipe } from './pipes/balance.pipe';
import { ShareStateService } from './state/share.service';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
    private shareStateService: ShareStateService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private cofixService: CofiXService,
    public toastController: ToastController,
    private permissionService: PermissionsService,
    private txService: TxService
  ) {}

  async getBalanceByCoin(coin) {
    if (coin.id === 'ETH') {
      coin.balance = await this.balanceTruncatePipe.transform(
        await this.cofixService.getETHBalance()
      );
    } else {
      coin.balance = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(coin.address)
      );
    }
    return coin.balance;
  }
  /*async showAlert(title, content, ev, footer = '') {
    const popover = await this.popoverController.create({
      component: TooltipsPage,
      cssClass: 'tooltips-class',
      componentProps: {
        tipsTitle: title,
        tipsContent: content,
        tipsFooter: footer,
      },
      event: ev,
    });
    await popover.present();
  }*/

  async getPairAttended() {
    const usdt = this.cofixService.getCurrentContractAddressList().USDT;
    const hbtc = this.cofixService.getCurrentContractAddressList().HBTC;
    this.shareStateService.updatePairAttended({
      USDT: await this.cofixService.pairAttended(usdt),
      HBTC: await this.cofixService.pairAttended(hbtc),
    });
  }
  async show(msg: string, position: any) {
    const toast = await this.toastController.create({
      message: msg,
      position,
      duration: 3000,
    });
    await toast.present();
  }

  getTokenAddres(coin) {
    return this.cofixService.getCurrentContractAddressList()[coin];
  }

  async approveHandler(
    loadingComponent,
    errorComponent,
    component,
    token: string,
    spender: string,
    approveInfo: string
  ) {
    loadingComponent.sq = true;
    console.log(approveInfo);
    await this.cofixService
      .approve(token, spender)
      .then((tx: any) => {
        const params = { t: 'tx_approve', p: { a: approveInfo } };
        this.txService.add(
          tx.hash,
          this.cofixService.getCurrentAccount(),
          JSON.stringify(params),
          this.cofixService.getCurrentNetwork()
        );
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          loadingComponent.sq = false;
          component.getIsApproved();
          this.permissionService.updatePermission(
            this.cofixService.getCurrentAccount(),
            token,
            spender
          );
          this.txService.txSucceeded(tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          loadingComponent.sq = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        errorComponent = { isError: true, msg: error.message };
        loadingComponent.sq = false;
      });
  }
}
