import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ShareStateQuery } from '../common/state/share.query';
import { CofiXService } from '../service/cofix.service';
import { Utils } from 'src/app/common/utils';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { CoinInputPage } from '../common/components/coin-input/coin-input.page';
import { BigNumber } from 'ethers';

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
  oracleCost: number = 0.01; //预言机调用费
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
    private cofixService: CofiXService,
    public shareStateQuery: ShareStateQuery,
    private balancePipe: BalanceTruncatePipe,
    private utils: Utils
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
    if (!this.shareStateQuery.getValue().connectedWallet) {
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
    if (!this.shareStateQuery.getValue().connectedWallet) {
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
      if (Number(this.fromCoin.amount) < 0) {
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
      if (this.toCoin.amount > this.ERC20BalanceOfPair[this.toCoin.id]) {
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

  async getEPAndEC(type = 'input') {
    const executionPriceAndExpectedCofi = await this.cofixService.executionPriceAndExpectedCofi(
      this.fromCoin.address,
      this.toCoin.address,
      this.fromCoin.amount || '0'
    );
    if (executionPriceAndExpectedCofi) {
      this.toCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );
      this.minimum = executionPriceAndExpectedCofi.excutionPrice * 0.99;

      this.expectedCofi = executionPriceAndExpectedCofi.expectedCofi;
      this.changePrice = executionPriceAndExpectedCofi.excutionPriceForOne;
    }
  }

  async setToCoinMax(event) {
    if (!this.shareStateQuery.getValue().connectedWallet) {
      return false;
    }
    this.toCoin.id = event.coin;
    this.fromCoin.amount = this.fromCoin.balance;
    this.getEPAndEC();
    this.showError = false;
  }

  resetAmout(type) {
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
    this.resetAmout('changeCoin');
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
      this.oracleCost = 0.02;
    } else {
      this.oracleCost = 0.01;
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
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.expectedCofi = '';
      if (!this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id]) {
        const shareState = this.shareStateQuery.getValue();
        this.utils.updateShareAddress(shareState);
      }

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
        Number(this.fromCoin.amount) !== 0 &&
        Number(this.fromCoin.amount) >= Number(this.fromCoin.balance);
    } else {
      this.showError =
        Number(this.fromCoin.amount) !== 0 &&
        Number(this.fromCoin.amount) > Number(this.fromCoin.balance);
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

  async showAlert(title, content, event, footer = '') {
    /*const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get(title).toPromise(),
      message: await this.translateService.get(content).toPromise(),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();*/
    this.utils.showAlert(title, content, event, footer);
  }

  async approve() {
    this.resetSwapError();
    if (!this.fromCoin.isApproved) {
      await this.utils.approveHandler(
        this.isLoading,
        this.swapError,
        this,
        this.fromCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter
      );
      console.log(this.swapError);
    }
  }

  async swap() {
    this.resetSwapError();
    this.isLoading.dh = true;
    if (this.fromCoin.id === 'ETH') {
      this.cofixService
        .swapExactETHForTokens(
          this.shareStateQuery.getValue().tokenPairAddress[this.toCoin.id],
          this.toCoin.address,
          this.fromCoin.amount || '0',
          this.toCoin.amount || '0',
          this.changePrice || '0',
          this.oracleCost.toString()
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.dh = false;
            this.resetAmout('swap');
            this.initCoinContent();
            this.getIsApproved();
          });
          provider.once('error', (error) => {
            console.log('provider.once==', error);
            this.isLoading.dh = false;
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
            this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id],
            this.fromCoin.address,
            this.fromCoin.amount || '0',
            this.toCoin.amount || '0',
            this.changePrice || '0',
            this.oracleCost.toString()
          )
          .then((tx: any) => {
            console.log('tx.hash', tx.hash);
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;
              this.resetAmout('swap');
              this.initCoinContent();
              this.getIsApproved();
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.isLoading.dh = false;
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
            this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id],
            this.fromCoin.address,
            this.shareStateQuery.getValue().tokenPairAddress[this.toCoin.id],
            this.toCoin.address,
            this.fromCoin.amount || '0',
            amountOut.excutionPrice,
            this.changePrice || '0',
            this.oracleCost.toString()
          )
          .then((tx: any) => {
            console.log('tx.hash', tx.hash);
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;
              this.resetAmout('swap');
              this.initCoinContent();
              this.getIsApproved();
            });
            provider.once('error', (error) => {
              console.log('provider.once==', error);
              this.isLoading.dh = false;
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
    if (this.fromCoin.id === 'ETH') {
      result =
        Number(this.fromCoin.amount) !== 0 &&
        Number(this.fromCoin.balance) > Number(this.maxFee) &&
        Number(this.fromCoin.amount) < Number(this.fromCoin.balance);
    } else {
      result =
        this.fromCoin.isApproved &&
        Number(this.fromCoin.amount) !== 0 &&
        Number(this.fromCoin.amount) <= Number(this.fromCoin.balance); //Token要认证且输入值小于等于余额
    }
    return (
      result &&
      Number(this.toCoin.amount) < this.ERC20BalanceOfPair[this.toCoin.id] //兑换值小于池中值
    );
  }

  selectArrowChange(event) {
    console.log(event);
    console.log(this.isShowDetail);
    this.isShowDetail = event.isDown;

    console.log(this.isShowDetail);
  }
  showSkeleton(value) {
    return value === undefined || value === '';
  }
}
