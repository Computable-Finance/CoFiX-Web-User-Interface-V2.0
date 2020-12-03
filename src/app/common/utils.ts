import { Injectable } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { PermissionsService } from 'src/app/state/permission/permission.service';

import { CofiXService } from '../service/cofix.service';
import { TxService } from '../state/tx/tx.service';
import { ConnectModal } from './components/connect-modal/connect-modal';
import { TxConfirmModal } from './components/transaction/tx-confirm/tx-confirm.modal';
import { TxStatusModal } from './components/transaction/tx-status/tx-status.modal';
import { BalanceTruncatePipe } from './pipes/balance.pipe';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
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

  async getPairAttended() {
    const usdt = this.cofixService.getCurrentContractAddressList().USDT;
    const hbtc = this.cofixService.getCurrentContractAddressList().HBTC;
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
          this.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          loadingComponent.sq = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        component.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.showTXRejectModal();
        } else {
          errorComponent = { isError: true, msg: error.message };
          loadingComponent.dh = false;
        }
      });
  }

  async showTXRejectModal() {
    const rejected = await this.popoverController.create({
      component: TxStatusModal,
      cssClass: 'txstatus-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await rejected.present();
  }
  async showTXSubmitModal(txHash) {
    const rejected = await this.popoverController.create({
      component: TxStatusModal,
      componentProps: {
        txHash,
        network: this.cofixService.getCurrentNetwork(),
      },
      cssClass: 'txstatus-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await rejected.present();
  }
  async showConnectModal() {
    return await this.popoverController.create({
      component: ConnectModal,
      cssClass: 'connect-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
  }
  async createTXConfirmModal() {
    return await this.popoverController.create({
      component: TxConfirmModal,
      cssClass: 'txconfirm-class',
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
  }

  changeTxStatus(status, txHash) {
    if (status) {
      this.txService.txSucceeded(txHash);
    } else {
      this.txService.txFailed(txHash);
    }
  }
}
