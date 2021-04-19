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
  selector: 'app-redeem-legacy-xtoken',
  templateUrl: './redeem-legacy-xtoken.page.html',
  styleUrls: ['./redeem-legacy-xtoken.page.scss'],
})
export class RedeemLegacyXTokenPage implements OnInit {
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
    this.getValue();
  }

  getValue() {
    this.coinList.forEach(async (coin) => {
      const stakingPoolAddress = await this.cofixLegacyService.getStakingPoolAddressByToken(
        this.cofixLegacyService.getCurrentContractAddressList()[coin]
      );
      this.hadValue[coin] = await this.balanceTruncatePipe.transform(
        await this.cofixLegacyService.getERC20Balance(stakingPoolAddress)
      );
    });
  }

  close() {
    this.modalController.dismiss();
  }

  canNotWithdraw(coin) {
    return isValidNumberForTx(this.hadValue[coin]);
  }

  async withdrawDepositedXToken(coin) {
    const address = this.cofixLegacyService.getCurrentContractAddressList()[
      coin
    ];
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixLegacyService
      .withdrawDepositedXToken(
        await this.cofixLegacyService.getStakingPoolAddressByToken(address),
        this.hadValue[coin]
      )
      .then((tx: any) => {
        this.isLoading[coin] = true;
        const params = {
          t: 'tx_widthdrawMining',
          p: {
            w: new BNJS(this.hadValue[coin]),
          },
        };
        console.log(params);
        this.txService.add(
          tx.hash,
          this.cofixService.getCurrentAccount(),
          JSON.stringify(params),
          this.cofixService.getCurrentNetwork()
        );

        console.log('tx.hash', tx.hash);
        this.waitingPopover.dismiss();
        this.utils.showTXSubmitModal(tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoading[coin] = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          this.hadValue[coin] = '0';
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoading[coin] = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
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
