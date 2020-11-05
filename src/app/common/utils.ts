import { Injectable } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { PermissionsService } from 'src/app/state/permission/permission.service';

import { CofiXService } from '../service/cofix.service';
import { TxService } from '../state/tx/tx.service';
import { TxConfirmPage } from './components/transaction/tx-confirm/tx-confirm.page';
import { TxStatusPage } from './components/transaction/tx-status/tx-status.page';
import { TxSuccessPage } from './components/transaction/tx-success/tx-success.page';
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
    private txService: TxService,
    private popoverController: PopoverController
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
  async showTxSuccessModal() {
    /* let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: 100,
          };
        },
      },
    };
    const popover = await this.popoverController.create({
      component: TxSuccessPage,
      cssClass: 'txsuccess-class',
      componentProps: {
        title: 'sss',
        txHash: '123',
        network: 3,
      },
      showBackdrop: false,
      event: ev as Event,
    });
    await popover.present({ ev });*/
  }

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
    console.log(approveInfo);
    await this.cofixService
      .approve(token, spender)
      .then((tx: any) => {
        loadingComponent.sq = true;
        const params = { t: 'tx_approve', p: { a: approveInfo } };
        this.txService.add(
          tx.hash,
          this.cofixService.getCurrentAccount(),
          JSON.stringify(params),
          this.cofixService.getCurrentNetwork()
        );
        component.waitingPopover.dismiss();
        this.showTXSubmitModal(tx.hash);
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
          component.approveBtn.disabled = false;
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          loadingComponent.sq = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.message.indexOf('User denied') > -1) {
          component.waitingPopover.dismiss();
          this.showTXRejectModal();
        } else {
          errorComponent = { isError: true, msg: error.message };
          loadingComponent.dh = false;
        }
      });
  }

  async showTXRejectModal() {
    const rejected = await this.popoverController.create({
      component: TxStatusPage,
      cssClass: 'txstatus-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await rejected.present();
  }
  async showTXSubmitModal(txHash) {
    const rejected = await this.popoverController.create({
      component: TxStatusPage,
      componentProps: {
        txHash: txHash,
        network: this.cofixService.getCurrentNetwork(),
      },
      cssClass: 'txstatus-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await rejected.present();
  }

  async createTXConfirmModal() {
    return await this.popoverController.create({
      component: TxConfirmPage,
      cssClass: 'txconfirm-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
  }
}
