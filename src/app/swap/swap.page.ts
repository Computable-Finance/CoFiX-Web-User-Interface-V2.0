import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BigNumber } from 'ethers';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/common/utils';

import { CoinInput } from '../common/components/coin-input/coin-input';
import { TipPannelContent } from '../common/components/tip-pannel/tip-pannel';
import { DEX_TYPE_COFIX, DEX_TYPE_UNISWAP } from '../common/constants';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { tokenName, tokens } from '../common/TokenList';
import { CoinContent } from '../common/types/CoinContent';
import { isValidNumberForTx } from '../common/uitils/bignumber-utils';
import { CofiXService } from '../service/cofix.service';
import { EventBusService } from '../service/eventbus.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { TxService } from '../state/tx/tx.service';

const BNJS = require('bignumber.js');

@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss'],
})
export class SwapPage implements OnInit, OnDestroy {
  @ViewChild(CoinInput, { static: false }) fromCoinInputView: CoinInput;
  @ViewChild(CoinInput, { static: false }) toCoinInputView: CoinInput;

  public swapContent: TipPannelContent = {
    title: 'swap_title',
    descriptions: ['swap_desc1', 'swap_desc2', 'swap_desc3'],
    more: {
      text: 'swap_more',
      url: 'https://github.com/Computable-Finance/Doc#5-trading-mechanism',
    },
  };

  changePrice: string;
  nestPrice: string;
  expectedCofi: string;
  priceSpread: string;
  oracleCost = '0.01';
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
  ERC20BalanceOfPair = { USDT: '', HBTC: '', ETH: '' };
  showBalance = true;
  isShowToMax = false;
  isShowFromMax = false;
  swapError = { isError: false, msg: '' };
  isShowDetail = false;
  minimum: any;
  waitingPopover: any;
  private eventbusSubscription: Subscription;
  DEX_TYPE = [];

  private balanceHandler = async (balance) => {
    this.fromCoin.balance = await this.balancePipe.transform(balance);
    this.getERC20BalanceOfPair();
    this.isShowFromMax = true;
  };

  constructor(
    public cofixService: CofiXService,
    private balancePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private eventbusService: EventBusService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.eventbusSubscription?.unsubscribe();
  }

  private unsubscribeAll() {
    this.fromCoin.subscription?.unsubscribe();
  }

  async ngOnInit() {
    this.eventbusSubscription = this.eventbusService.on(
      'wallet_connected',
      () => {
        this.refreshPage();
      }
    );
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.refreshPage();
      this.cofixService.getCurrentProvider().on('block', async (blockNum) => {
        this.getEPAndEC();
      });
    }, 3000);
  }

  refreshPage() {
    this.getCoinContent();
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
      toAddress = this.cofixService.getCurrentContractAddressList().WETH9;
      fromAddress = this.fromCoin.address;
    } else {
      fromAddress = this.toCoin.address;
    }

    if (this.fromCoin.id && this.cofixService.isCoFixToken(fromAddress)) {
      this.ERC20BalanceOfPair[
        this.toCoin.id
      ] = await this.cofixService.getERC20BalanceOfPair(fromAddress, toAddress);
    }
  }

  async getEPAndEC() {
    if (!this.fromCoin.amount) {
      this.toCoin.amount = undefined;
      this.expectedCofi = undefined;
      return;
    }

    const executionPriceAndExpectedCofi = await this.cofixService.executionPriceAndExpectedCofi(
      this.fromCoin.address,
      this.toCoin.address,
      this.fromCoin.amount || '0'
    );

    if (this.changePrice === '0') {
      this.swapError = {
        isError: true,
        msg: 'Insufficient liquidity for this trade.',
      };
      this.resetAmount();
      this.nestPrice = '0';
      this.priceSpread = '0';
      return;
    }

    if (executionPriceAndExpectedCofi) {
      this.toCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.amountOut
      );
      this.minimum = new BNJS(executionPriceAndExpectedCofi.excutionPrice)
        .times(0.99)
        .toString();
      switch (executionPriceAndExpectedCofi.expectedCofi.length) {
        case 1:
          this.expectedCofi = (
            await executionPriceAndExpectedCofi.expectedCofi[0]
          ).toString();
          break;
        case 2:
          this.expectedCofi = (
            await executionPriceAndExpectedCofi.expectedCofi[0]
          )
            .plus(await executionPriceAndExpectedCofi.expectedCofi[1])
            .toString();
          break;
        default:
          this.expectedCofi = '0';
          break;
      }

      this.changePrice = executionPriceAndExpectedCofi.excutionPrice;
      this.nestPrice = await this.cofixService.nestPrice(
        this.fromCoin.address,
        this.toCoin.address
      );

      this.priceSpread = new BNJS(this.nestPrice)
        .minus(this.changePrice)
        .toString();
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
  }

  initValues() {
    this.fromCoin.isApproved = false;
    this.toCoin.isApproved = false;
    this.expectedCofi = '';
    this.isShowFromMax = false;
    this.isShowToMax = false;
    this.minimum = '';
  }

  changeCoin() {
    this.initValues();
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
    this.getCoinContent();
    await this.getIsApproved();
    this.changeOracleCost();
    await this.getERC20BalanceOfPair();
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
    this.getCoinContent();
    await this.getIsApproved();
    this.changeOracleCost();
    await this.getERC20BalanceOfPair();
    this.getEPAndEC();
  }

  changeOracleCost() {
    if (
      this.fromCoin.id !== 'ETH' &&
      this.toCoin.id !== 'ETH' &&
      this.cofixService.isCoFixToken(this.fromCoin.address) &&
      this.cofixService.isCoFixToken(this.toCoin.address)
    ) {
      this.oracleCost = '0.02';
    } else {
      if (
        !this.cofixService.isCoFixToken(this.fromCoin.address) &&
        !this.cofixService.isCoFixToken(this.toCoin.address)
      ) {
        this.oracleCost = '0';
      } else {
        this.oracleCost = '0.01';
      }
    }
  }

  async getCoinContent() {
    this.unsubscribeAll();
    this.showError = false;

    if (this.cofixService.getCurrentProvider) {
      this.fromCoin.address = this.getAddress(this.fromCoin.id);
      this.toCoin.address = this.getAddress(this.toCoin.id);

      this.changePrice = (
        await this.cofixService.executionPriceAndExpectedCofi(
          this.fromCoin.address,
          this.toCoin.address,
          '1'
        )
      ).excutionPrice;

      if (this.changePrice === '0') {
        this.swapError = {
          isError: true,
          msg: 'Insufficient liquidity for this trade.',
        };
        this.resetAmount();
        this.nestPrice = '0';
        this.priceSpread = '0';
        return;
      }
    }

    if (this.cofixService.getCurrentAccount()) {
      this.fromCoin.balance = await this.utils.getBalanceByCoin(this.fromCoin);
      if (this.fromCoin.id === 'ETH') {
        this.fromCoin.subscription = this.balancesQuery
          .currentETHBalance$(this.cofixService.getCurrentAccount())
          .subscribe(this.balanceHandler);
      } else {
        this.fromCoin.subscription = this.balancesQuery
          .currentERC20Balance$(
            this.cofixService.getCurrentAccount(),
            this.fromCoin.address
          )
          .subscribe(this.balanceHandler);
      }

      this.changeShowError();
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
    this.getEPAndEC();
    this.changeShowError();
  }

  changeShowError() {
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
    this.initValues();
    this.getCoinContent();
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

  async swap() {
    if (
      !isValidNumberForTx(this.fromCoin.amount) ||
      !isValidNumberForTx(this.toCoin.amount) ||
      !isValidNumberForTx(this.changePrice)
    ) {
      return;
    }

    this.resetSwapError();
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    if (this.fromCoin.id === 'ETH') {
      if (this.cofixService.isCoFixToken(this.toCoin.address)) {
        this.DEX_TYPE = [DEX_TYPE_COFIX];
      } else {
        this.DEX_TYPE = [DEX_TYPE_UNISWAP];
      }
      this.resolveSwapPromise(
        this.cofixService.swapExactETHForTokens(
          await this.cofixService.getPairAddressByToken(this.toCoin.address),
          this.toCoin.address,
          this.fromCoin.amount,
          this.toCoin.amount,
          this.changePrice,
          this.oracleCost,
          this.DEX_TYPE
        )
      );
    } else {
      if (this.toCoin.id === 'ETH') {
        if (this.cofixService.isCoFixToken(this.fromCoin.address)) {
          this.DEX_TYPE = [DEX_TYPE_COFIX];
        } else {
          this.DEX_TYPE = [DEX_TYPE_UNISWAP];
        }
        this.resolveSwapPromise(
          this.cofixService.swapExactTokensForETH(
            await this.cofixService.getPairAddressByToken(
              this.fromCoin.address
            ),
            this.fromCoin.address,
            this.fromCoin.amount,
            this.toCoin.amount,
            this.changePrice,
            this.oracleCost,
            this.DEX_TYPE
          )
        );
      } else {
        let dexTypeIn, dexTypeOut;
        if (this.cofixService.isCoFixToken(this.fromCoin.address)) {
          dexTypeIn = DEX_TYPE_COFIX;
        } else {
          dexTypeIn = DEX_TYPE_UNISWAP;
        }
        if (this.cofixService.isCoFixToken(this.toCoin.address)) {
          dexTypeOut = DEX_TYPE_COFIX;
        } else {
          dexTypeOut = DEX_TYPE_UNISWAP;
        }

        this.DEX_TYPE = [dexTypeIn, dexTypeOut];
        this.resolveSwapPromise(
          this.cofixService.swapExactTokensForTokens(
            await this.cofixService.getPairAddressByToken(
              this.fromCoin.address
            ),
            this.fromCoin.address,
            await this.cofixService.getPairAddressByToken(this.toCoin.address),
            this.toCoin.address,
            this.fromCoin.amount,
            this.toCoin.amount,
            this.changePrice,
            this.oracleCost,
            this.DEX_TYPE
          )
        );
      }
    }
  }

  private resolveSwapPromise(promise) {
    const params = {
      t: 'tx_swapped',
      p: {
        f: `${new BNJS(this.fromCoin.amount)} ${this.fromCoin.id}`,
        t: `${new BNJS(this.toCoin.amount)} ${this.toCoin.id}`,
      },
    };

    promise
      .then((tx: any) => {
        this.afterTXSubmitted(tx.hash, params);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.afterTxSucceeded(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          this.txService.txFailed(tx.hash);
          this.catchTXError(error);
        });
      })
      .catch((error) => {
        this.catchTXError(error);
      });
  }

  canSwap() {
    let result = false;
    if (!this.cofixService.getCurrentAccount() || this.changePrice === '0') {
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
          new BNJS(this.fromCoin.amount).lte(new BNJS(this.fromCoin.balance));
      }
      return (
        result &&
        (this.cofixService.isCoFixToken(this.toCoin.address)
          ? new BNJS(this.toCoin.amount).lt(
              new BNJS(this.ERC20BalanceOfPair[this.toCoin.id])
            )
          : true)
      );
    }
  }

  selectArrowChange(event) {
    this.isShowDetail = event.isDown;
  }

  showDetail(event) {
    if (event.srcElement.id) {
      this.isShowDetail = !this.isShowDetail;
    }
  }

  tokenName(t) {
    return tokenName(t);
  }

  private getAddress(tokenId: string) {
    if (tokenId.startsWith('0x')) {
      return tokenId;
    } else {
      return tokens.find(
        (token) =>
          token.symbol === tokenId &&
          token.chainId === this.cofixService.getCurrentNetwork()
      )?.address;
    }
  }
}
