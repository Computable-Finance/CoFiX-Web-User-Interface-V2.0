import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CofiXService } from '../service/cofix.service';
import { BalancePipe } from './pipes/balance.pipe';
import { ShareStateQuery } from './state/share.query';
import { ShareStateService } from './state/share.service';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
    private shareStateService: ShareStateService,
    private balancePipe: BalancePipe,
    private alertController: AlertController,
    private translateService: TranslateService,
    private cofixService: CofiXService,
    public toastController: ToastController
  ) {}
  public async updateShareAddress(shareState: any) {
    const address_USDT = this.cofixService.getCurrentContractAddressList()[
      'USDT'
    ];
    const address_HBTC = this.cofixService.getCurrentContractAddressList()[
      'HBTC'
    ];
    shareState.tokenPairAddress = {
      USDT: await this.cofixService.getCoFixPairAddressByToken(address_USDT),
      HBTC: await this.cofixService.getCoFixPairAddressByToken(address_HBTC),
    };
    shareState.stakingPoolAddress = {
      USDT: await this.cofixService.getStakingPoolAddress(
        shareState.tokenPairAddress['USDT']
      ),
      HBTC: await this.cofixService.getStakingPoolAddress(
        shareState.tokenPairAddress['HBTC']
      ),
    };
    this.shareStateService.updateShareStore(shareState);
  }

  async getBalanceByCoin(coin) {
    if (coin.id === 'ETH') {
      coin.balance = await this.balancePipe.transform(
        await this.cofixService.ethersOf(
          await this.cofixService.getETHBalance()
        )
      );
    } else {
      coin.balance = await this.balancePipe.transform(
        await this.cofixService.unitsOf(
          await this.cofixService.getERC20Balance(coin.address),
          await this.cofixService.getERC20Decimals(coin.address)
        )
      );
    }
    return coin.balance;
  }
  async showAlert() {
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
}