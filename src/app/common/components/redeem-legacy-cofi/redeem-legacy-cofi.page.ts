import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import BNJS from 'bignumber.js/bignumber';
import { CofiXLegacyService } from 'src/app/service/cofix-legacy.service';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxService } from 'src/app/state/tx/tx.service';
import { BalanceTruncatePipe } from '../../pipes/balance.pipe';
import { isValidNumberForTx } from '../../uitils/bignumber-utils';
import { Utils } from '../../utils';

@Component({
  selector: 'app-redeem-legacy-cofi',
  templateUrl: './redeem-legacy-cofi.page.html',
  styleUrls: ['./redeem-legacy-cofi.page.scss'],
})
export class RedeemLegacyCofiPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private cofixLegacyService: CofiXLegacyService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private cofixService: CofiXService
  ) {}

  moreDetailTitle: string = 'more_details';
  coinList = ['USDT', 'HBTC'];
  hadValue = { USDT: '', HBTC: '' };
  waitingPopover: any;
  amountForRemoveLiquidity: any = { erc20Amount: '', ethAmount: '', fee: '' };
  oracleCost = '0.01';
  isLoading = { USDT: false, HBTC: false };
  cofiError = {
    USDT: { isError: false, msg: '' },
    HBTC: { isError: false, msg: '' },
  };

  ngOnInit() {
    console.log('###');
    this.getValue();
  }

  getValue() {
    this.coinList.forEach(async (coin) => {
      const result = await this.cofixLegacyService.earnedCofiAndRewardRate(
        this.cofixLegacyService.getCurrentContractAddressList()[coin]
      );
      console.log(result);

      this.hadValue[coin] = await this.balanceTruncatePipe.transform(
        result.earned
      );
    });
  }

  close() {
    this.modalController.dismiss();
  }

  canNotWithdraw(coin) {
    return isValidNumberForTx(this.hadValue[coin]);
  }

  async withdrawDepositedCofi(coin) {
    const address = this.cofixLegacyService.getCurrentContractAddressList()[
      coin
    ];

    if (await this.cofixLegacyService.getStakingPoolAddressByToken(address)) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.cofixLegacyService
        .withdrawEarnedCoFi(
          await this.cofixLegacyService.getStakingPoolAddressByToken(address),
          false
        )
        .then((tx: any) => {
          this.isLoading[coin] = true;
          const params = {
            t: 'tx_claimCoFi',
            p: { w: this.hadValue[coin] },
          };
          this.txService.add(
            tx.hash,
            this.cofixService.getCurrentAccount(),
            JSON.stringify(params),
            this.cofixService.getCurrentNetwork()
          );
          this.waitingPopover.dismiss();
          this.utils.showTXSubmitModal(tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading[coin] = false;
            this.hadValue[coin] = undefined;
            this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading[coin] = false;
            this.txService.txFailed(tx.hash);
          });
        })
        .catch((error) => {
          this.isLoading[coin] = false;
          this.waitingPopover.dismiss();
          if (error.message.indexOf('User denied') > -1) {
            this.utils.showTXRejectModal();
          } else {
            this.cofiError[coin] = { isError: true, msg: error.message };
          }
        });
    }
  }
}
