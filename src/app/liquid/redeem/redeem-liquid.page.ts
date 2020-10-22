import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CoinInputPage } from 'src/app/common/components/coin-input/coin-input.page';
import { ERC20BalancePipe } from 'src/app/common/pipes/erc20balance.pipe';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { CoinContent } from 'src/app/swap/swap.page';

@Component({
  selector: 'app-redeem-liquid',
  templateUrl: './redeem-liquid.page.html',
  styleUrls: ['./redeem-liquid.page.scss'],
})
export class RedeemLiquidPage implements OnInit {
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
  shareState: any;
  isLoading = { sh: false, sq: false };
  showError = false;
  ETHAmountForRemoveLiquidity: number;
  tokenAmountForRemoveLiquidity: number;

  constructor(
    private cofixService: CofiXService,
    private erc20balancePipe: ERC20BalancePipe,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils
  ) {}

  ngOnInit() {
    this.toCoin.id = this.coin;
    this.initCoinContent();
    this.getIsApproved();
    this.getRemoveLiquidity();
  }

  async setToCoinMax(event) {
    if (!this.shareStateQuery.getValue().connectedWallet) {
      return false;
    }
    this.toCoin.amount = this.todoValue;
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
    this.shareState = this.shareStateQuery.getValue();
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];

      if (
        !this.shareState.tokenPairAddress[this.toCoin.id] ||
        !this.shareState.stakingPoolAddress[this.toCoin.id]
      ) {
        await this.utils.updateShareAddress(this.shareState);
      }
      this.todoValue = await this.erc20balancePipe.transform(
        await this.cofixService.getERC20Balance(
          this.shareState.tokenPairAddress[this.toCoin.id]
        )
      );

      this.hadValue = await this.erc20balancePipe.transform(
        await this.cofixService.getERC20Balance(
          this.shareState.stakingPoolAddress[this.toCoin.id]
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
  }

  async getRemoveLiquidity() {
    const pair = this.shareStateQuery.getValue().tokenPairAddress[
      this.toCoin.id
    ];
    if (this.isTokenChecked || this.isETHChecked) {
      this.NAVPerShare = await this.cofixService.getNAVPerShare(
        this.toCoin.address,
        this.shareState.tokenPairAddress[this.toCoin.id]
      );
    }

    this.ETHAmountForRemoveLiquidity = await this.cofixService.getETHAmountForRemoveLiquidity(
      this.toCoin.address,
      pair,
      this.toCoin.amount || '0'
    );

    this.tokenAmountForRemoveLiquidity = await this.cofixService.getTokenAmountForRemoveLiquidity(
      this.toCoin.address,
      pair,
      this.toCoin.amount || '0'
    );
    this.canShowError();
  }

  async getIsApproved() {
    this.toCoin.isApproved = await this.cofixService.approved(
      this.shareState.tokenPairAddress[this.toCoin.id],
      this.cofixService.getCurrentContractAddressList().CofixRouter
    );
  }

  async redeem() {
    if (!this.isTokenChecked && !this.isETHChecked) {
      return false;
    }
    const token = this.toCoin.address;
    const pair = this.shareStateQuery.getValue().tokenPairAddress[
      this.toCoin.id
    ];
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
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.sh = false;
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
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
          });
        })
        .catch((error) => {
          console.log(error);
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
          ethAmount.toString(),
          this.oracleCost.toString()
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.sh = false;
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
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sh = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading.sh = false;
        });
    }
  }

  async approve() {
    if (!this.toCoin.isApproved) {
      this.isLoading.sq = true;
      this.cofixService
        .approve(
          this.shareState.tokenPairAddress[this.toCoin.id],
          this.cofixService.getCurrentContractAddressList().CofixRouter
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.sq = false;
            this.getIsApproved();
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.sq = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading.sq = false;
        });
    }
  }

  canRedeem() {
    return (
      this.toCoin.isApproved &&
      !(Number(this.toCoin.amount) === 0) &&
      Number(this.toCoin.amount) <= Number(this.todoValue)
    );
  }

  canShowError() {
    this.showError = Number(this.toCoin.amount) > Number(this.todoValue);
  }
}
