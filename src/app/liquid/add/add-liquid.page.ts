import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import BNJS from 'bignumber.js';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoinInput } from 'src/app/common/components/coin-input/coin-input';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { CoinContent } from 'src/app/common/types/CoinContent';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { BalancesQuery } from 'src/app/state/balance/balance.query';
import { MarketDetailsQuery } from 'src/app/state/market/market.query';
import { SettingsQuery } from 'src/app/state/setting/settings.query';
import { SettingsService } from 'src/app/state/setting/settings.service';
import { TxService } from 'src/app/state/tx/tx.service';
import { WarningDetailPage } from '../warning/warning-detail/warning-detail.page';

@Component({
  selector: 'app-add-liquid',
  templateUrl: './add-liquid.page.html',
  styleUrls: ['./add-liquid.page.scss'],
})
export class AddLiquidPage implements OnInit, OnDestroy {
  @Input() coin: string;
  @Input() pairAttended = false;
  @Output() onClose = new EventEmitter<any>();
  @ViewChild(CoinInput, { static: false }) fromCoinInputView: CoinInput;
  @ViewChild(CoinInput, { static: false }) toCoinInputView: CoinInput;
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
  isSelectCoin = false;
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
  addLiquidError = { isError: false, msg: '' };
  cardTitle = { title: 'liquidpool_add', subtitle: 'liquidpool_add_subtitle' };
  waitingPopover: any;
  isValidRatio = false;
  ratioAmount: number = 0;

  private resizeSubscription: Subscription;
  private changePriceOfToTokenSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    public settingsQuery: SettingsQuery,
    private utils: Utils,
    private modalController: ModalController,
    private settingsService: SettingsService,
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
    const knownRiskForAdd = this.settingsQuery.knownRiskForAdd();
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
          this.settingsService.updateKnownRiskForAdd(data.data.knownRisk);
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

  async ratioInput(event) {
    this.resetLiquidError();
    this.ratioAmount = event.amount;

    const ratio = await this.cofixService.getInitialAssetRatio(
      this.toCoin.address
    );

    this.fromCoin.amount = new BNJS(this.ratioAmount)
      .times(ratio.ethAmount)
      .toString();
    this.toCoin.amount = new BNJS(this.ratioAmount)
      .times(ratio.erc20Amount)
      .toString();

    this.setExpectedXToken();
    this.getIsValidRatio();
  }

  async getIsValidRatio() {
    this.isValidRatio = await this.cofixService.isValidRatio(
      this.toCoin.address,
      this.fromCoin.amount,
      this.toCoin.amount
    );
  }

  async setExpectedXToken() {
    this.expectedXToken = await this.cofixService.expectedXToken(
      this.toCoin.address,
      this.fromCoin.amount || '0'
    );
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
          this.fromCoin.amount || '0'
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
      await this.utils.approveHandler(
        this.isLoading,
        this.addLiquidError,
        this,
        this.toCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter,
        `ETH/${this.toCoin.id} Liquidity Pool`
      );
      this.getIsApproved();
    }
  }

  checkAdd() {
    this.isStake = !this.isStake;
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedXToken = '';

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
        });

      this.toCoin.balance = await this.utils.getBalanceByCoin(this.toCoin);
      this.toCoin.subscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.toCoin.address
        )
        .subscribe((balance) => {
          this.toCoin.balance = balance;
        });
    }
  }

  async walletConnected() {
    this.initCoinContent();
  }

  canAddLiquid() {
    let result = false;
    this.fromCoin.amount = this.fromCoin.amount || '0';
    this.toCoin.amount = this.toCoin.amount || '0';

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
    result = result && this.isValidRatio && Number(this.ratioAmount) > 0;
    return result;
  }

  canApprove() {
    return (
      this.cofixService.getCurrentAccount() &&
      !this.toCoin.isApproved &&
      new BNJS(this.toCoin.amount).gt(0)
    );
  }

  overToBalance() {
    return new BNJS(this.toCoin.amount).gt(new BNJS(this.toCoin.balance));
  }

  overFromBalance() {
    return new BNJS(this.fromCoin.amount).gt(new BNJS(this.fromCoin.balance));
  }
}
