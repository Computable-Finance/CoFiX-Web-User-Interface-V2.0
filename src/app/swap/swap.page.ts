import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ShareStateQuery } from '../common/state/share.query';
import { CofiXService } from '../service/cofix.service';
import { Utils } from 'src/app/common/utils';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { CoinInputPage } from '../common/components/coin-input/coin-input.page';
import { BigNumber } from 'ethers';
import { TxQuery } from '../state/tx/tx.query';
import { Subscription } from 'rxjs';
import { TxService } from '../state/tx/tx.service';
import { TranslateService } from '@ngx-translate/core';
const BNJS = require('bignumber.js');
export interface CoinContent {
  id: string;
  address: string;
  amount: string;
  placeholder: string;
  isApproved: boolean;
  balance: string;
}
@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss'],
})
export class SwapPage implements OnInit {
  @ViewChild(CoinInputPage, { static: false }) fromCoinInputView: CoinInputPage;
  @ViewChild(CoinInputPage, { static: false }) toCoinInputView: CoinInputPage;
  public swapContent: BannerContent = {
    title: 'swap_title',
    descriptions: ['swap_desc1', 'swap_desc2', 'swap_desc3'],
    more: {
      text: 'swap_more',
      url: 'https://github.com/Computable-Finance/Doc#5-trading-mechanism',
    },
  };
  changePrice: string;
  expectedCofi: string;
  oracleCost: string = '0.01'; //预言机调用费
  maxFee = '0.02';
  fromCoin: CoinContent = {
    id: 'ETH',
    address: undefined,
    amount: '',
    placeholder: '0.0',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: undefined,
    amount: '',
    placeholder: '0.0',
    isApproved: false,
    balance: '',
  };
  canChangeCoin = false;
  isLoading = { sq: false, dh: false };
  showError = false;
  isInsufficientError = false;
  ERC20BalanceOfPair = { USDT: '', HBTC: '', ETH: '' };
  showBalance = true;
  isShowToMax = false;
  isShowFromMax = false;
  swapError = { isError: false, msg: '' };
  isShowDetail = false;
  minimum: any;
  constructor(
    public cofixService: CofiXService,
    public shareStateQuery: ShareStateQuery,
    private balancePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService
  ) {}

  async ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.refreshPage();
      }, 3000);
    } else {
      this.refreshPage();
    }
  }

  refreshPage() {
    this.initCoinContent();
    this.getIsApproved();
    this.getERC20BalanceOfPair();
  }
  async getIsApproved() {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    if (this.fromCoin.id !== 'ETH') {
      this.fromCoin.isApproved = await this.cofixService.approved(
        this.fromCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter
      );
    }
  }
  isShowApprove() {
    return this.fromCoin.id !== 'ETH' && !this.fromCoin.isApproved;
  }

  async setFromCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }

    this.resetSwapError();
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
        this.showError = true;
        this.fromCoin.amount = '0';
        this.toCoin.amount = '';
        return; //不进行后面的计算
      } else {
        this.showError = false;
      }
    } else {
      this.fromCoin.amount = this.fromCoin.balance;
      this.showError = true;
    }

    this.getEPAndEC();

    if (this.toCoin.id !== 'ETH') {
      //计算结果

      if (
        new BNJS(this.toCoin.amount).gt(
          new BNJS(this.ERC20BalanceOfPair[this.toCoin.id])
        )
      ) {
        this.toCoin.amount = this.ERC20BalanceOfPair[this.toCoin.id];
      }
    }
  }

  async getERC20BalanceOfPair() {
    let fromAddress;
    let toAddress = this.toCoin.address;

    if (this.toCoin.id === 'ETH') {
      toAddress = this.cofixService.getCurrentContractAddressList()['WETH9'];
      fromAddress = this.fromCoin.address;
    } else {
      fromAddress = this.toCoin.address;
    }

    if (this.fromCoin.id) {
      this.ERC20BalanceOfPair[
        this.toCoin.id
      ] = await this.cofixService.getERC20BalanceOfPair(fromAddress, toAddress);
    }
  }

  async getEPAndEC() {
    const executionPriceAndExpectedCofi = await this.cofixService.executionPriceAndExpectedCofi(
      this.fromCoin.address,
      this.toCoin.address,
      this.fromCoin.amount || '0'
    );
    if (executionPriceAndExpectedCofi) {
      this.toCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );
      this.minimum = new BNJS(executionPriceAndExpectedCofi.excutionPrice)
        .times(0.99)
        .toString();

      this.expectedCofi = executionPriceAndExpectedCofi.expectedCofi;
      this.changePrice = executionPriceAndExpectedCofi.excutionPriceForOne;
    }
  }

  async setToCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    this.toCoin.id = event.coin;
    this.fromCoin.amount = this.fromCoin.balance;
    this.getEPAndEC();
    this.showError = false;
  }

  resetAmount() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.fromCoin.isApproved = false;
    this.toCoin.isApproved = false;
    this.expectedCofi = '';
    this.isShowFromMax = false;
    this.isShowToMax = false;
    this.minimum = '';
  }

  changeCoin() {
    this.resetAmount();
    const tempCoin = this.fromCoin;
    this.fromCoin = this.toCoin;
    this.toCoin = tempCoin;
  }

  async changeFromCoin(event) {
    if (event.coin === 'ETH' && this.fromCoin.id === event.coin) {
      return false;
    }

    if (event.coin === this.toCoin.id) {
      this.changeCoin();
    } else {
      this.fromCoin.id = event.coin;
    }

    this.resetSwapError();
    this.initCoinContent();
    await this.getIsApproved();
    this.changeOracleCost();
    await this.getERC20BalanceOfPair();
    this.toCoinInputView.resetSubscription();
    this.fromCoinInputView.resetSubscription();
    this.getEPAndEC();
  }

  async changeToCoin(event) {
    if (event.coin === this.toCoin.id) {
      return false;
    }
    if (event.coin === this.fromCoin.id) {
      this.changeCoin();
    } else {
      this.toCoin.id = event.coin;
    }

    this.resetSwapError();
    this.initCoinContent();
    await this.getIsApproved();
    this.changeOracleCost();
    await this.getERC20BalanceOfPair();

    this.toCoinInputView.resetSubscription();
    this.fromCoinInputView.resetSubscription();
    this.getEPAndEC();
  }

  changeOracleCost() {
    if (this.fromCoin.id !== 'ETH' && this.toCoin.id !== 'ETH') {
      this.oracleCost = '0.02';
    } else {
      this.oracleCost = '0.01';
    }
  }

  async initCoinContent() {
    this.showError = false;
    this.isInsufficientError = false;
    if (this.cofixService.getCurrentProvider) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];
      this.changePrice = (
        await this.cofixService.changePrice(
          this.fromCoin.address,
          this.toCoin.address
        )
      ).toString();
    }
    if (this.cofixService.getCurrentAccount()) {
      this.expectedCofi = '';
      this.fromCoin.balance = await this.utils.getBalanceByCoin(this.fromCoin);
      this.isShowFromMax = this.fromCoin.balance ? true : false;
    }
  }
  resetSwapError() {
    this.swapError = { isError: false, msg: '' };
  }
  fromCoinInput(event) {
    this.resetSwapError();
    this.fromCoin.id = event.coin;
    this.fromCoin.amount = event.amount;
    this.toCoin.amount = '';
    this.expectedCofi = '';
    this.getEPAndEC();
    if (this.fromCoin.id === 'ETH') {
      this.showError =
        !new BNJS(this.fromCoin.amount).isZero() &&
        new BNJS(this.fromCoin.amount).gte(new BNJS(this.fromCoin.balance));
    } else {
      this.showError =
        !new BNJS(this.fromCoin.amount).isZero() &&
        new BNJS(this.fromCoin.amount).gt(new BNJS(this.fromCoin.balance));
    }
  }

  async toCoinInput(event) {
    this.resetSwapError();
    this.toCoin.amount = event.amount;
    this.fromCoin.amount = '';
    this.expectedCofi = '';
    const executionPriceAndExpectedCofi = await this.cofixService.executionPriceAndExpectedCofi(
      this.toCoin.address,
      this.fromCoin.address,
      this.toCoin.amount || '0'
    );
    if (executionPriceAndExpectedCofi) {
      this.fromCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );
      this.expectedCofi = executionPriceAndExpectedCofi.expectedCofi;
    }
  }

  async approve() {
    this.resetSwapError();
    if (!this.fromCoin.isApproved) {
      await this.utils.approveHandler(
        this.isLoading,
        this.swapError,
        this,
        this.fromCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter,
        this.fromCoin.id
      );
      console.log(this.swapError);
    }
  }

  async swap() {
    this.resetSwapError();
    this.isLoading.dh = true;
    let params = {
      t: 'tx_swapped',
      p: {
        f: `${this.fromCoin.amount} ${this.fromCoin.id}`,
        t: `${this.toCoin.amount} ${this.toCoin.id}`,
      },
    };
    if (this.fromCoin.id === 'ETH') {
      this.cofixService
        .swapExactETHForTokens(
          await this.cofixService.getPairAddressByToken(this.toCoin.address),
          this.toCoin.address,
          this.fromCoin.amount || '0',
          this.toCoin.amount || '0',
          this.changePrice || '0',
          this.oracleCost
        )
        .then(async (tx: any) => {
          console.log('tx.hash', tx.hash);

          this.txService.add(
            tx.hash,
            this.cofixService.getCurrentAccount(),
            JSON.stringify(params),
            this.cofixService.getCurrentNetwork()
          );

          const provider = this.cofixService.getCurrentProvider();

          provider.once(tx.hash, (transactionReceipt) => {
            console.log('success====', tx.hash);
            this.isLoading.dh = false;
            this.resetAmount();
            this.initCoinContent();
            this.getIsApproved();
            this.txService.txSucceeded(tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.error==', error);
            this.isLoading.dh = false;
            this.txService.txFailed(tx.hash);
          });
        })
        .catch((error) => {
          console.log('catch error==', error);
          this.swapError = { isError: true, msg: error.message };
          this.isLoading.dh = false;
        });
    } else {
      if (this.toCoin.id === 'ETH') {
        this.cofixService
          .swapExactTokensForETH(
            await this.cofixService.getPairAddressByToken(
              this.fromCoin.address
            ),
            this.fromCoin.address,
            this.fromCoin.amount || '0',
            this.toCoin.amount || '0',
            this.changePrice || '0',
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
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;
              this.resetAmount();
              this.initCoinContent();
              this.getIsApproved();
              this.txService.txSucceeded(tx.hash);
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.isLoading.dh = false;
              this.txService.txFailed(tx.hash);
            });
          })
          .catch((error) => {
            console.log('catch error==', error);
            this.swapError = { isError: true, msg: error.message };

            this.isLoading.dh = false;
          });
      } else {
        const amountOut = await this.cofixService.executionPriceAndExpectedCofi(
          this.fromCoin.address,
          this.toCoin.address,
          this.fromCoin.amount || '0'
        );
        await this.cofixService
          .swapExactTokensForTokens(
            await this.cofixService.getPairAddressByToken(
              this.fromCoin.address
            ),
            this.fromCoin.address,
            await this.cofixService.getPairAddressByToken(this.toCoin.address),
            this.toCoin.address,
            this.fromCoin.amount || '0',
            amountOut.excutionPrice,
            this.changePrice || '0',
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
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;
              this.resetAmount();
              this.initCoinContent();
              this.getIsApproved();
              this.txService.txSucceeded(tx.hash);
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.isLoading.dh = false;
              this.txService.txFailed(tx.hash);
            });
          })
          .catch((error) => {
            console.log('catch error==', error);
            this.swapError = { isError: true, msg: error.message };

            this.isLoading.dh = false;
          });
      }
    }
  }

  canSwap() {
    let result = false;
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    } else {
      if (this.fromCoin.id === 'ETH') {
        result =
          !new BNJS(this.fromCoin.amount).isZero() &&
          new BNJS(this.fromCoin.balance).gt(new BNJS(this.maxFee)) &&
          new BNJS(this.fromCoin.amount).lt(new BNJS(this.fromCoin.balance));
      } else {
        result =
          this.fromCoin.isApproved &&
          !new BNJS(this.fromCoin.amount).isZero() &&
          new BNJS(this.fromCoin.amount).lte(new BNJS(this.fromCoin.balance)); //Token要认证且输入值小于等于余额
      }
      return (
        result &&
        new BNJS(this.toCoin.amount).lt(
          new BNJS(this.ERC20BalanceOfPair[this.toCoin.id])
        ) //兑换值小于池中值
      );
    }
  }

  selectArrowChange(event) {
    this.isShowDetail = event.isDown;
  }
  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
