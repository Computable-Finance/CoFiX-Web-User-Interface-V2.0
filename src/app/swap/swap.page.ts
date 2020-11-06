import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { CofiXService } from '../service/cofix.service';
import { Utils } from 'src/app/common/utils';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { CoinInputPage } from '../common/components/coin-input/coin-input.page';
import { BigNumber } from 'ethers';
import { TxService } from '../state/tx/tx.service';
import { CoinContent } from '../common/types/CoinContent';
import { BalancesQuery } from '../state/balance/balance.query';
import { MarketDetailsQuery } from '../state/market/market.query';
import { Subscription } from 'rxjs';
const BNJS = require('bignumber.js');
@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss'],
})
export class SwapPage implements OnInit, OnDestroy {
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
  priceSpread: string;
  oracleCost = '0.01'; //预言机调用费
  maxFee = '0.02';
  fromCoin: CoinContent = {
    id: 'ETH',
    address: undefined,
    amount: '',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: undefined,
    amount: '',
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
  waitingPopover: any;

  changePriceOfFromTokenSubscription: Subscription;
  changePriceOfToTokenSubscription: Subscription;

  private balanceHandler = async (balance) => {
    this.fromCoin.balance = await this.balanceTruncatePipe.transform(balance);
    this.getERC20BalanceOfPair();
    this.isShowFromMax = true;
  };

  constructor(
    public cofixService: CofiXService,
    private balancePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery,
    private balanceTruncatePipe: BalanceTruncatePipe
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private unsubscribeAll() {
    this.fromCoin.subscription?.unsubscribe();
    this.changePriceOfFromTokenSubscription?.unsubscribe();
    this.changePriceOfToTokenSubscription?.unsubscribe();
  }

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
        return;
      } else {
        this.showError = false;
      }
    } else {
      this.fromCoin.amount = this.fromCoin.balance;
      this.showError = true;
    }

    this.getEPAndEC();

    if (this.toCoin.id !== 'ETH') {
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
      this.priceSpread = new BNJS(this.changePrice);
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
    this.unsubscribeAll();
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
    this.fromCoin.subscription?.unsubscribe();
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
      this.changePrice = await this.cofixService.changePrice(
        this.fromCoin.address,
        this.toCoin.address
      );
      if (this.fromCoin.id !== 'ETH') {
        this.changePriceOfFromTokenSubscription = this.marketDetailsQuery
          .marketDetails$(this.fromCoin.address, 'checkedPriceNow')
          .subscribe(async (price) => {
            this.getEPAndEC();
          });
      }

      if (this.toCoin.id !== 'ETH') {
        this.changePriceOfToTokenSubscription = this.marketDetailsQuery
          .marketDetails$(this.toCoin.address, 'checkedPriceNow')
          .subscribe(async (price) => {
            this.getEPAndEC();
          });
      }

      this.priceSpread = new BNJS(this.changePrice).minus(0);
    }
    if (this.cofixService.getCurrentAccount()) {
      this.unsubscribeAll();

      if (this.fromCoin.id === 'ETH') {
        this.fromCoin.subscription = this.balancesQuery
          .currentETHBalance$(this.cofixService.getCurrentAccount())
          .subscribe(this.balanceHandler);
      } else {
        this.fromCoin.balance = await this.utils.getBalanceByCoin(
          this.fromCoin
        );
        this.fromCoin.subscription = this.balancesQuery
          .currentERC20Balance$(
            this.cofixService.getCurrentAccount(),
            this.fromCoin.address
          )
          .subscribe(this.balanceHandler);
      }

      this.expectedCofi = '';
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
        Number(this.fromCoin.amount) !== 0 &&
        new BNJS(this.fromCoin.amount).gte(new BNJS(this.fromCoin.balance));
    } else {
      this.showError =
        Number(this.fromCoin.amount) !== 0 &&
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

    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();

    if (!this.fromCoin.isApproved) {
      await this.utils.approveHandler(
        this.isLoading,
        this.swapError,
        this,
        this.fromCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter,
        this.fromCoin.id
      );
    }
  }

  private afterTXSubmitted(txHash, params) {
    this.waitingPopover.dismiss();
    this.isLoading.dh = true;
    this.txService.add(
      txHash,
      this.cofixService.getCurrentAccount(),
      JSON.stringify(params),
      this.cofixService.getCurrentNetwork()
    );

    this.utils.showTXSubmitModal(txHash);
  }

  private afterTxSucceeded(status, txHash) {
    this.isLoading.dh = false;
    this.resetAmount();
    this.initCoinContent();
    this.getIsApproved();
    this.utils.changeTxStatus(status, txHash);
  }

  private catchTXError(error) {
    this.waitingPopover.dismiss();
    if (error.message.indexOf('User denied') > -1) {
      this.utils.showTXRejectModal();
    } else {
      this.swapError = { isError: true, msg: error.message };
      this.isLoading.dh = false;
    }
  }
  getTXParams() {
    return {
      t: 'tx_swapped',
      p: {
        f: `${new BNJS(this.fromCoin.amount)} ${this.fromCoin.id}`,
        t: `${new BNJS(this.toCoin.amount)} ${this.toCoin.id}`,
      },
    };
  }
  async swap() {
    this.resetSwapError();

    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();

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
          this.afterTXSubmitted(tx.hash, this.getTXParams());

          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.afterTxSucceeded(transactionReceipt.status, tx.hash);
          });
          provider.once('error', (error) => {
            console.log('provider.error==', error);
            this.txService.txFailed(tx.hash);
            this.catchTXError(error);
          });
        })
        .catch((error) => {
          console.log('catch error==', error);
          this.catchTXError(error);
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
            this.afterTXSubmitted(tx.hash, this.getTXParams());
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.afterTxSucceeded(transactionReceipt.status, tx.hash);
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.txService.txFailed(tx.hash);
              this.catchTXError(error);
            });
          })
          .catch((error) => {
            console.log('catch error==', error);
            this.catchTXError(error);
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
            this.afterTXSubmitted(tx.hash, this.getTXParams());
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.afterTxSucceeded(transactionReceipt.status, tx.hash);
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.txService.txFailed(tx.hash);
              this.catchTXError(error);
            });
          })
          .catch((error) => {
            console.log('catch error==', error);
            this.catchTXError(error);
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
          Number(this.fromCoin.amount) !== 0 &&
          new BNJS(this.fromCoin.balance).gt(new BNJS(this.maxFee)) &&
          new BNJS(this.fromCoin.amount).lt(new BNJS(this.fromCoin.balance));
      } else {
        result =
          this.fromCoin.isApproved &&
          Number(this.fromCoin.amount) !== 0 &&
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
