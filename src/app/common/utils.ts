import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PermissionsService } from 'src/app/state/permission/permission.service';

import { CofiXService } from '../service/cofix.service';
import { BalanceTruncatePipe } from './pipes/balance.pipe';
import { ShareStateService } from './state/share.service';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
    private shareStateService: ShareStateService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private alertController: AlertController,
    private translateService: TranslateService,
    private cofixService: CofiXService,
    public toastController: ToastController,
    private permissionService: PermissionsService
  ) {}
  public async updateShareAddress(shareState: any) {
    const address_USDT = this.cofixService.getCurrentContractAddressList()[
      'USDT'
    ];
    const address_HBTC = this.cofixService.getCurrentContractAddressList()[
      'HBTC'
    ];
    shareState.tokenPairAddress = {
      USDT: await this.cofixService.getPairAddressByToken(address_USDT),
      HBTC: await this.cofixService.getPairAddressByToken(address_HBTC),
    };
    shareState.stakingPoolAddress = {
      USDT: await this.cofixService.getStakingPoolAddressByToken(address_USDT),
      HBTC: await this.cofixService.getStakingPoolAddressByToken(address_HBTC),
    };
    this.shareStateService.updateShareStore(shareState);
  }

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
  /*async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get('note').toPromise(),
      message: await this.translateService.get('have_submit').toPromise(),
      buttons: [
        {
          text: await this.translateService.get('i_know').toPromise(),
        },
      ],
    });
    await alert.present();
  }*/
  async showAlert(title, content) {
    const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get(title).toPromise(),
      message: await this.translateService.get(content).toPromise(),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();
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
      position: position,
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
    spender: string
  ) {
    loadingComponent.sq = true;
    await this.cofixService
      .approve(token, spender)
      .then((tx: any) => {
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          loadingComponent.sq = false;
          component.getIsApproved();
          this.permissionService.updatePermission(
            this.cofixService.getCurrentAccount(),
            token,
            spender
          );
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          loadingComponent.sq = false;
        });
      })
      .catch((error) => {
        console.log(error);
        errorComponent = { isError: true, msg: error.message };
        loadingComponent.sq = false;
      });
  }
}
