import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoinInputPage } from 'src/app/common/components/coin-input/coin-input.page';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { ShareState } from 'src/app/common/state/share.store';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxService } from 'src/app/state/tx/tx.service';
import { CoinContent } from 'src/app/swap/swap.page';

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
    placeholder: '0.0',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: '',
    amount: '',
    placeholder: '0.0',
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
  NAVPerShare: string;
  oracleCost = 0.01;
  shareState: ShareState;
  isLoading = { sh: false, sq: false };
  showError = false;
  ETHAmountForRemoveLiquidity: number;
  tokenAmountForRemoveLiquidity: number;
  redeemError = { isError: false, msg: '' };

  cardTitle = {
    title: 'liquidpool_withdraw_title',
    subtitle: 'liquidpool_withdraw_subtitle',
  };
  private resizeSubscription: Subscription;
  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils,
    private txService: TxService
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

  changeCoin(event) {
    this.toCoin.id = event.coin;
    this.initCoinContent();
    this.getRemoveLiquidity();
    this.getIsApproved();
    this.toCoinInputView.resetSubscription();
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.todoValue = '';
    this.hadValue = '';
    this.NAVPerShare = '';
    this.isETHChecked = false;
    this.isTokenChecked = false;
    this.resetRedeemError();
    this.shareState = this.shareStateQuery.getValue();
    if (this.cofixService.getCurrentAccount()) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];
      console.log(this.toCoin);
      console.log(
        await this.cofixService.getStakingPoolAddressByToken(
          this.toCoin.address
        )
      );
      await this.cofixService.getStakingPoolAddressByToken(this.toCoin.address);
      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getPairAddressByToken(this.toCoin.address)
        )
      );

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixService.getERC20Balance(
          await this.cofixService.getStakingPoolAddressByToken(
            this.toCoin.address
          )
        )
      );
      this.shareStateService.updateShareStore(this.shareState);
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

      console.log(result);
      this.ETHAmountForRemoveLiquidity = result.result;
      this.NAVPerShare = result.nAVPerShareForBurn;
    }
    if (this.isTokenChecked) {
      const result = await this.cofixService.getTokenAmountForRemoveLiquidity(
        this.toCoin.address,
        pair,
        this.toCoin.amount || '0'
      );
      this.tokenAmountForRemoveLiquidity = result.result;
      this.NAVPerShare = result.nAVPerShareForBurn;
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
    this.isLoading.sh = true;
    let ethAmount;

    if (this.isETHChecked) {
      ethAmount = this.ETHAmountForRemoveLiquidity;
      this.cofixService
        .removeLiquidityGetETH(
          pair,
          token,
          this.toCoin.amount || '0',
          ethAmount.toString(),
          this.oracleCost.toString()
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const params = {
            t: 'tx_withdrawLiquid',
            p: {
              w: this.toCoin.amount,
            },
          };
          console.log(params);
          this.txService.add(
            tx.hash,
            this.cofixService.getCurrentAccount(),
            JSON.stringify(params),
            this.cofixService.getCurrentNetwork()
          );
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.sh = false;
            this.initCoinContent();
            this.txService.txSucceeded(tx.hash);
            this.onClose.emit({
              type: 'redeem',
              fromCoin: this.fromCoin,
              toCoin: this.toCoin,
            });
          });
          /*provider.once(tx.hash, (transaction) => {
            this.isLoading.sh = false;
            this.initCoinContent();
          });*/
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
            this.txService.txFailed(tx.hash);
          });
        })
        .catch((error) => {
          console.log(error);
          this.redeemError = { isError: true, msg: error.message };
          this.isLoading.sh = false;
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
          this.oracleCost.toString()
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.sh = false;
            this.txService.txSucceeded(tx.hash);
            //this.initCoinContent();
            this.onClose.emit({
              type: 'redeem',
              fromCoin: this.fromCoin,
              toCoin: this.toCoin,
            });
          });
          provider.once(tx.hash, (transaction) => {
            this.isLoading.sh = false;
            this.initCoinContent();
            this.txService.txFailed(tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.redeemError = { isError: true, msg: error.message };
          this.isLoading.sh = false;
        });
    }
  }
  resetRedeemError() {
    this.redeemError = { isError: false, msg: '' };
  }
  async approve() {
    this.resetRedeemError();
    if (!this.toCoin.isApproved) {
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
      !new BNJS(this.toCoin.amount).isZero() &&
      new BNJS(this.toCoin.amount).lte(new BNJS(this.todoValue))
    );
  }

  canShowError() {
    this.showError = new BNJS(this.toCoin.amount).gt(new BNJS(this.todoValue));
  }

  ngOnDestroy() {
    console.log('destroy---');
    this.resizeSubscription.unsubscribe();
  }
}
