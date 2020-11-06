import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoinInputPage } from 'src/app/common/components/coin-input/coin-input.page';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { CoinContent } from 'src/app/common/types/CoinContent';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { BalancesQuery } from 'src/app/state/balance/balance.query';
import { MarketDetailsQuery } from 'src/app/state/market/market.query';
import { TxService } from 'src/app/state/tx/tx.service';

const BNJS = require('bignumber.js');
@Component({
  selector: 'app-redeem-liquid',
  templateUrl: './redeem-liquid.page.html',
  styleUrls: ['./redeem-liquid.page.scss'],
})
export class RedeemLiquidPage implements OnInit, OnDestroy {
  @Input() coin: string;
  @Output() onClose = new EventEmitter<any>();
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
  showInputSelect = true;
  xtValue = 'XT-1';
  isETHChecked = false;
  isTokenChecked = false;
  coinAddress: string;
  todoValue: string;
  hadValue: string;
  oracleCost = '0.01';
  isLoading = { sh: false, sq: false };
  showError = false;
  ETHAmountForRemoveLiquidity: number;
  tokenAmountForRemoveLiquidity: number;
  redeemError = { isError: false, msg: '' };

  cardTitle = {
    title: 'liquidpool_withdraw_title',
    subtitle: 'liquidpool_withdraw_subtitle',
  };
  waitingPopover: any;

  private resizeSubscription: Subscription;
  private todoValueSubscription: Subscription;
  private hadValueSubscription: Subscription;
  private changePriceOfToTokenSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery
  ) {}

  ngOnInit() {
    this.toCoin.id = this.coin;
    this.initCoinContent();
    this.getIsApproved();
    this.getRemoveLiquidity();
    this.changeCartTitle();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeCartTitle();
      });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.todoValueSubscription?.unsubscribe();
    this.hadValueSubscription?.unsubscribe();
    this.changePriceOfToTokenSubscription?.unsubscribe();
  }

  changeCartTitle() {
    if (window.innerWidth < 500) {
      this.cardTitle = {
        title: 'liquidpool_withdraw_title_short',
        subtitle: 'liquidpool_withdraw_subtitle_short',
      };
    } else {
      this.cardTitle = {
        title: 'liquidpool_withdraw_title',
        subtitle: 'liquidpool_withdraw_subtitle',
      };
    }
  }
  async setToCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    this.toCoin.amount = this.todoValue;
    this.toCoin.balance = this.todoValue;
    this.getRemoveLiquidity();
  }

  cancel() {
    this.onClose.emit({ type: 'cancel' });
  }

  confirmAddLiquid() {
    this.onClose.emit({
      type: 'add',
      fromCoin: this.fromCoin,
      toCoin: this.toCoin,
    });
  }

  changeETHCheck() {
    if (this.isETHChecked) {
      this.isTokenChecked = false;
    }
    this.getRemoveLiquidity();
  }

  changeTokenCheck() {
    if (this.isTokenChecked) {
      this.isETHChecked = false;
    }
    this.getRemoveLiquidity();
    this.resetRedeemError();
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.todoValue = '';
    this.hadValue = '';
    this.isETHChecked = false;
    this.isTokenChecked = false;
    this.resetRedeemError();

    this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
      this.fromCoin.id
    ];
    this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
      this.toCoin.id
    ];

    this.changePriceOfToTokenSubscription = this.marketDetailsQuery
      .marketDetails$(this.toCoin.address, 'checkedPriceNow')
      .subscribe(async (price) => {
        this.getRemoveLiquidity();
      });

    if (this.cofixService.getCurrentAccount()) {
      this.todoValueSubscription?.unsubscribe();
      this.hadValueSubscription?.unsubscribe();

      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getPairAddressByToken(this.toCoin.address)
        )
      );
      this.todoValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getPairAddressByToken(this.toCoin.address)
        )
        .subscribe(async (balance) => {
          this.todoValue = await this.balanceTruncatePipe.transform(balance);
        });

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getStakingPoolAddressByToken(
            this.toCoin.address
          )
        )
      );
      this.hadValueSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          await this.cofixService.getStakingPoolAddressByToken(
            this.toCoin.address
          )
        )
        .subscribe(async (balance) => {
          this.hadValue = await this.balanceTruncatePipe.transform(balance);
        });
    }
  }

  async walletConnected() {
    this.initCoinContent();
    this.getIsApproved();
  }

  async ToCoinInput(event) {
    this.toCoin.amount = event.amount;
    this.getRemoveLiquidity();
    this.resetRedeemError();
  }

  async getRemoveLiquidity() {
    const pair = await this.cofixService.getPairAddressByToken(
      this.toCoin.address
    );
    if (this.isETHChecked) {
      const result = await this.cofixService.getETHAmountForRemoveLiquidity(
        this.toCoin.address,
        pair,
        this.toCoin.amount || '0'
      );

      this.ETHAmountForRemoveLiquidity = result.result;
    }
    if (this.isTokenChecked) {
      const result = await this.cofixService.getTokenAmountForRemoveLiquidity(
        this.toCoin.address,
        pair,
        this.toCoin.amount || '0'
      );
      this.tokenAmountForRemoveLiquidity = result.result;
    }
    this.canShowError();
  }

  async getIsApproved() {
    this.toCoin.isApproved = await this.cofixService.approved(
      await this.cofixService.getPairAddressByToken(this.toCoin.address),
      this.cofixService.getCurrentContractAddressList().CofixRouter
    );
  }

  async redeem() {
    this.resetRedeemError();
    if (!this.isTokenChecked && !this.isETHChecked) {
      return false;
    }
    const token = this.toCoin.address;
    const pair = await this.cofixService.getPairAddressByToken(
      this.toCoin.address
    );

    let ethAmount;
    const params = {
      t: 'tx_withdrawLiquid',
      p: {
        w: new BNJS(this.toCoin.amount),
      },
    };
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    if (this.isETHChecked) {
      ethAmount = this.ETHAmountForRemoveLiquidity;
      this.cofixService
        .removeLiquidityGetETH(
          pair,
          token,
          this.toCoin.amount || '0',
          ethAmount.toString(),
          this.oracleCost
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          this.isLoading.sh = true;

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
            this.isLoading.sh = false;
            this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
            this.onClose.emit({
              type: 'redeem',
              fromCoin: this.fromCoin,
              toCoin: this.toCoin,
            });
          });

          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
            this.txService.txFailed(tx.hash);
          });
        })
        .catch((error) => {
          console.log(error);

          this.isLoading.sh = false;
          this.waitingPopover.dismiss();
          if (error.message.indexOf('User denied') > -1) {
            this.utils.showTXRejectModal();
          } else {
            this.redeemError = { isError: true, msg: error.message };
          }
        });
    }
    if (this.isTokenChecked) {
      ethAmount = this.tokenAmountForRemoveLiquidity;
      this.cofixService
        .removeLiquidityGetToken(
          pair,
          token,
          this.toCoin.amount || '0',
          ethAmount?.toString(),
          this.oracleCost
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
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
            this.isLoading.sh = false;
            this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
            this.onClose.emit({
              type: 'redeem',
              fromCoin: this.fromCoin,
              toCoin: this.toCoin,
            });
          });
          provider.once(tx.hash, (transaction) => {
            this.isLoading.sh = false;
            this.txService.txFailed(tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading.sh = false;
          this.waitingPopover.dismiss();
          if (error.message.indexOf('User denied') > -1) {
            this.utils.showTXRejectModal();
          } else {
            this.redeemError = { isError: true, msg: error.message };
          }
        });
    }
  }
  resetRedeemError() {
    this.redeemError = { isError: false, msg: '' };
  }
  async approve() {
    this.resetRedeemError();

    if (!this.toCoin.isApproved) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoading,
        this.redeemError,
        this,
        await this.cofixService.getPairAddressByToken(this.toCoin.address),
        this.cofixService.getCurrentContractAddressList().CofixRouter,
        `ETH/${this.toCoin.id} Liquidity Pool`
      );
    }
  }

  canRedeem() {
    return (
      this.toCoin.isApproved &&
      Number(this.toCoin.amount) !== 0 &&
      new BNJS(this.toCoin.amount).lte(new BNJS(this.todoValue))
    );
  }

  canShowError() {
    this.showError = new BNJS(this.toCoin.amount).gt(new BNJS(this.todoValue));
  }
}
