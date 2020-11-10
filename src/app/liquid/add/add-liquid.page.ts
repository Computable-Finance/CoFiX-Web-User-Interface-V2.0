import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BigNumber } from 'ethers';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { CoinInputPage } from 'src/app/common/components/coin-input/coin-input.page';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxService } from 'src/app/state/tx/tx.service';
import { CoinContent } from 'src/app/common/types/CoinContent';
import { WarningDetailPage } from '../warning/warning-detail/warning-detail.page';
import { MarketDetailsQuery } from 'src/app/state/market/market.query';
import { BalancesQuery } from 'src/app/state/balance/balance.query';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';

const BNJS = require('bignumber.js');
@Component({
  selector: 'app-add-liquid',
  templateUrl: './add-liquid.page.html',
  styleUrls: ['./add-liquid.page.scss'],
})
export class AddLiquidPage implements OnInit, OnDestroy {
  @Input() coin: string;
  @Input() pairAttended = false;
  @Output() onClose = new EventEmitter<any>();
  @ViewChild(CoinInputPage, { static: false }) fromCoinInputView: CoinInputPage;
  @ViewChild(CoinInputPage, { static: false }) toCoinInputView: CoinInputPage;
  fromCoin: CoinContent = {
    id: 'ETH',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };
  isDropDown: false;
  xtValue = 'XT-1';
  isStake = false;
  expectedXToken: string;
  earnedRate: any;
  coinAddress: string;
  todoValue: string;
  hadValue: string;
  NAVPerShare: string;
  oracleCost = 0.01;
  maxFee = '0.05';
  isLoading = { cr: false, sq: false };
  showFromError = false;
  showToError = false;
  showBalance = true;
  addLiquidError = { isError: false, msg: '' };
  isShowFromMax = false;
  isShowToMax = false;
  cardTitle = { title: 'liquidpool_add', subtitle: 'liquidpool_add_subtitle' };
  waitingPopover: any;

  private resizeSubscription: Subscription;
  private changePriceOfToTokenSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils,
    private modalController: ModalController,
    private shareStateService: ShareStateService,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery,
    private balanceTruncatePipe: BalanceTruncatePipe
  ) {}

  ngOnInit() {
    this.showWarning();
    this.toCoin.id = this.coin;
    this.initCoinContent();
    this.getIsApproved();
    this.changeCartTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeCartTitle();
      });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.unsubscribeAll();
  }

  private unsubscribeAll() {
    this.fromCoin.subscription?.unsubscribe();
    this.toCoin.subscription?.unsubscribe();
    this.changePriceOfToTokenSubscription?.unsubscribe();
  }

  changeCartTitle() {
    if (window.innerWidth < 500) {
      this.cardTitle = {
        title: 'liquidpool_add_short',
        subtitle: 'liquidpool_add_subtitle_short',
      };
    } else {
      this.cardTitle = {
        title: 'liquidpool_add',
        subtitle: 'liquidpool_add_subtitle',
      };
    }
  }

  async showWarning() {
    const knownRiskForAdd = this.shareStateQuery.getValue().knownRiskForAdd;
    if (!knownRiskForAdd) {
      const modal = await this.modalController.create({
        component: WarningDetailPage,
        cssClass: 'popover-warning',
        animated: false,
        keyboardClose: false,
        showBackdrop: true,
        backdropDismiss: false,
      });
      await modal.present();
      modal.onDidDismiss().then((data: any) => {
        if (data.data.knownRisk) {
          this.shareStateService.updateKnownRiskForAdd(data.data.knownRisk);
        }
      });
    }
  }

  async getIsApproved() {
    if (this.cofixService.getCurrentAccount()) {
      this.toCoin.isApproved = await this.cofixService.approved(
        this.toCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter
      );
    }
  }

  async setFromCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    this.fromCoin.id = event.coin;

    if (this.fromCoin.id === 'ETH') {
      const currentGasFee = await this.cofixService.currentGasFee();
      this.fromCoin.amount = this.cofixService
        .ethersOf(
          BigNumber.from(
            this.cofixService
              .parseEthers(this.fromCoin.balance)
              .sub(this.cofixService.parseEthers(this.maxFee))
              .sub(this.cofixService.parseEthers(currentGasFee))
          )
        )
        .toString();
      if (new BNJS(this.fromCoin.amount).lt(0)) {
        this.showFromError = true;
        this.fromCoin.amount = '0';
        this.toCoin.amount = '';
        return;
      } else {
        this.showFromError = false;
      }
    } else {
      this.fromCoin.amount = this.fromCoin.balance;
      this.showFromError = true;
    }

    this.resetLiquidError();
    this.setExpectedXToken();
  }

  canShowError() {
    this.showFromError = new BNJS(this.fromCoin.amount).gt(
      new BNJS(this.fromCoin.balance)
    );
    this.showToError = new BNJS(this.toCoin.amount).gt(
      new BNJS(this.toCoin.balance)
    );
  }

  async setExpectedXToken() {
    this.expectedXToken = await this.cofixService.expectedXToken(
      this.toCoin.address,
      this.fromCoin.amount || '0',
      this.toCoin.amount || '0'
    );
  }

  async setToCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    this.toCoin.id = event.coin;
    this.toCoin.amount = this.toCoin.balance;
    this.showToError = false;

    this.resetLiquidError();
    this.setExpectedXToken();
  }

  cancel() {
    this.onClose.emit({ type: 'cancel', toCoin: this.toCoin });
  }

  async confirmAddLiquid() {
    this.resetLiquidError();
    if (!this.fromCoin.amount && !this.toCoin.amount) {
      return false;
    }
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    await this.cofixService
      .addLiquidity(
        this.toCoin.address,
        this.fromCoin.amount || '0',
        this.toCoin.amount || '0',
        await this.cofixService.expectedXToken(
          this.toCoin.address,
          this.fromCoin.amount || '0',
          this.toCoin.amount || '0'
        ),
        this.oracleCost.toString(),
        this.isStake
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);

        this.isLoading.cr = true;
        const params = {
          t: 'tx_addLiquid',
          p: {
            a: `${
              this.fromCoin.amount
                ? new BNJS(this.fromCoin.amount) + ' ' + this.fromCoin.id
                : ''
            } ${this.fromCoin.amount && this.toCoin.amount ? ',' : ''} ${
              this.toCoin.amount
                ? new BNJS(this.toCoin.amount) + ' ' + this.toCoin.id
                : ''
            }`,
          },
        };
        console.log(params);
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
          this.isLoading.cr = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
          this.onClose.emit({
            type: 'add',
            fromCoin: this.fromCoin,
            toCoin: this.toCoin,
          });
        });
        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoading.cr = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading.cr = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.addLiquidError = { isError: true, msg: error.message };
        }
      });
  }

  resetLiquidError() {
    this.addLiquidError = { isError: false, msg: '' };
  }

  async approve() {
    this.resetLiquidError();
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    if (!this.toCoin.isApproved) {
      this.utils.approveHandler(
        this.isLoading,
        this.addLiquidError,
        this,
        this.toCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter,
        `ETH/${this.toCoin.id} Liquidity Pool`
      );
    }
  }

  checkAdd() {
    this.isStake = !this.isStake;
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedXToken = '';
    this.showToError = false;
    this.showFromError = false;

    this.unsubscribeAll();

    if (this.cofixService.getCurrentProvider) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];
      this.changePriceOfToTokenSubscription = this.marketDetailsQuery
        .marketDetails$(this.toCoin.address, 'checkedPriceNow', 'changePrice')
        .subscribe(async (price) => {
          this.setExpectedXToken();
        });
    }
    if (this.cofixService.getCurrentAccount()) {
      this.fromCoin.balance = await this.utils.getBalanceByCoin(this.fromCoin);
      this.fromCoin.subscription = this.balancesQuery
        .currentETHBalance$(this.cofixService.getCurrentAccount())
        .subscribe(async (balance) => {
          this.fromCoin.balance = await this.balanceTruncatePipe.transform(
            balance
          );
          this.isShowFromMax = this.fromCoin.balance ? true : false;
        });

      this.toCoin.balance = await this.utils.getBalanceByCoin(this.toCoin);
      this.toCoin.subscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.toCoin.address
        )
        .subscribe((balance) => {
          this.toCoin.balance = balance;
          this.isShowToMax = this.toCoin.balance ? true : false;
        });
    }
  }

  async walletConnected() {
    this.initCoinContent();
  }

  async fromCoinInput(event) {
    this.resetLiquidError();
    this.fromCoin.amount = event.amount;
    this.setExpectedXToken();
    this.canShowError();
    if (new BNJS(this.fromCoin.amount).gte(new BNJS(this.fromCoin.balance))) {
      this.showFromError = true;
    } else {
      this.showFromError = false;
    }
  }

  async toCoinInput(event) {
    this.toCoin.amount = event.amount;
    this.resetLiquidError();
    this.setExpectedXToken();
    this.canShowError();
  }

  canAdd() {
    let result = false;
    if (Number(this.toCoin.amount) === 0) {
      result =
        new BNJS(this.fromCoin.amount).gt(0) &&
        new BNJS(this.fromCoin.amount).lt(new BNJS(this.fromCoin.balance)); //仅输入ETH，且ETH不等于最大值
    } else {
      result =
        this.toCoin.isApproved && //已经认证
        !(
          Number(this.fromCoin.amount) === 0 && Number(this.toCoin.amount) === 0
        ) && //输入值均不为0
        new BNJS(this.fromCoin.amount).lte(new BNJS(this.fromCoin.balance)) && //输入ETH值小于最大值
        new BNJS(this.toCoin.amount).lte(new BNJS(this.toCoin.balance));
    }
    return result;
  }

  canApprove() {
    return (
      this.cofixService.getCurrentAccount() &&
      !this.toCoin.isApproved &&
      new BNJS(this.toCoin.amount).gt(0)
    );
  }
}
