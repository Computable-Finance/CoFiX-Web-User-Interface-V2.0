import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BannerContent } from '../common/components/banner/banner.page';
import { ShareStateQuery } from '../common/state/share.query';
import { CofiXService } from '../service/cofix.service';
import { Utils } from 'src/app/common/utils';
import { BalancePipe } from '../common/pipes/balance.pipe';
import { ShareStateService } from '../common/state/share.service';
import { EventBusService } from '../service/eventbus.service';
import { ERC20BalancePipe } from '../common/pipes/erc20balance.pipe';

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
  public swapContent: BannerContent = {
    title: 'swap_title',
    descriptions: ['swap_desc1', 'swap_desc2', 'swap_desc3', 'swap_desc4'],
    more: {
      text: 'swap_more',
      url:
        'https://github.com/Computable-Finance/Doc#72-details-about-the-trading-mining',
    },
  };
  changePrice: string;
  expectedCofi: string;
  oracleCost: number = 0.01; //预言机调用费
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
  constructor(
    private cofixService: CofiXService,
    private translateService: TranslateService,
    private alertController: AlertController,
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService,
    private balancePipe: BalancePipe,
    private utils: Utils,
    private erc20balancePipe: ERC20BalancePipe
  ) {}

  async ngOnInit() {
    if (this.cofixService.getCurrentAccount() === undefined) {
      setTimeout(() => {
        this.initCoinContent();
        this.getIsApproved();
        this.initERC20Decimal();
        this.getERC20BalanceOfPair();
      }, 3000);
    } else {
      this.initCoinContent();
      this.getIsApproved();
      this.initERC20Decimal();
      this.getERC20BalanceOfPair();
    }
  }

  async walletConnected() {
    this.initCoinContent();
    this.getIsApproved();
    this.initERC20Decimal();
  }

  async getIsApproved() {
    if (!this.shareStateQuery.getValue().connectedWallet) {
      return false;
    }
    if (this.fromCoin.id === 'ETH') {
      this.toCoin.isApproved = await this.cofixService.approved(
        this.toCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter
      );
    } else {
      this.fromCoin.isApproved = await this.cofixService.approved(
        this.fromCoin.address,
        this.cofixService.getCurrentContractAddressList().CofixRouter
      );
    }
  }

  async setFromCoinMax(event) {
    if (!this.shareStateQuery.getValue().connectedWallet) {
      return false;
    }
    this.fromCoin.id = event.coin;
    this.fromCoin.amount = this.fromCoin.balance;
    this.showError = false;
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
      Number(this.fromCoin.amount)
    );
    if (executionPriceAndExpectedCofi) {
      const amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );
      this.toCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );

      this.expectedCofi = executionPriceAndExpectedCofi.expectedCofi.toString();
      this.changePrice = executionPriceAndExpectedCofi.excutionPriceForOne.toString();
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

  resetAmout() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedCofi = '';
  }

  changeCoin() {
    this.resetAmout();
    const tempCoin = this.fromCoin;
    this.fromCoin = this.toCoin;
    this.toCoin = tempCoin;

    this.initCoinContent();
    this.getIsApproved();
    this.initERC20Decimal();
    this.getERC20BalanceOfPair();
  }

  changeFromCoin(event) {
    if (event.coin === 'ETH' && this.fromCoin.id === event.coin) {
      return false;
    }

    if (event.coin === this.toCoin.id) {
      this.changeCoin();
    } else {
      this.fromCoin.id = event.coin;
    }
    this.initCoinContent();
    this.initERC20Decimal();
    this.getIsApproved();
    this.changeOracleCost();
    this.getERC20BalanceOfPair();
  }

  changeToCoin(event) {
    if (event.coin === this.toCoin.id) {
      return false;
    }
    if (event.coin === this.fromCoin.id) {
      this.changeCoin();
    } else {
      this.toCoin.id = event.coin;
    }
    this.initCoinContent();
    this.initERC20Decimal();
    this.getIsApproved();
    this.changeOracleCost();
    this.getERC20BalanceOfPair();
  }

  changeOracleCost() {
    if (this.fromCoin.id !== 'ETH' && this.toCoin.id !== 'ETH') {
      this.oracleCost = 0.02;
    } else {
      this.oracleCost = 0.01;
    }
  }

  async initERC20Decimal() {
    const shareState = this.shareStateQuery.getValue();
    if (shareState.connectedWallet) {
      let coin = this.toCoin;
      if (this.fromCoin.id !== 'ETH') {
        coin = this.fromCoin;
      }

      if (coin.id === 'USDT') {
        shareState.erc20Decimals = {
          USDT: await this.cofixService.getERC20Decimals(coin.address),
          HBTC: shareState.erc20Decimals['HBTC'],
        };
      } else {
        shareState.erc20Decimals = {
          USDT: shareState.erc20Decimals['USDT'],
          HBTC: await this.cofixService.getERC20Decimals(coin.address),
        };
      }

      this.shareStateService.updateShareStore(shareState);
    }
  }

  async initCoinContent() {
    this.showError = false;
    this.isInsufficientError = false;
    this.resetAmout();
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
      this.resetAmout();

      if (!this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id]) {
        const shareState = this.shareStateQuery.getValue();
        this.utils.updateShareAddress(shareState);
      }

      this.fromCoin.balance = await this.utils.getBalanceByCoin(this.fromCoin);
    }
  }

  fromCoinInput(event) {
    this.fromCoin.id = event.coin;
    this.fromCoin.amount = event.amount;
    this.toCoin.amount = '';
    this.expectedCofi = '';
    this.getEPAndEC();
    this.showError =
      Number(this.fromCoin.amount) !== 0 &&
      Number(this.fromCoin.amount) > Number(this.fromCoin.balance);
  }

  async toCoinInput(event) {
    this.toCoin.amount = event.amount;
    this.fromCoin.amount = '';
    this.expectedCofi = '';
    const executionPriceAndExpectedCofi = await this.cofixService.executionPriceAndExpectedCofi(
      this.toCoin.address,
      this.fromCoin.address,
      Number(this.toCoin.amount)
    );
    if (executionPriceAndExpectedCofi) {
      this.fromCoin.amount = await this.balancePipe.transform(
        executionPriceAndExpectedCofi.excutionPrice
      );
      this.expectedCofi = executionPriceAndExpectedCofi.expectedCofi.toString();
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get('jgsm_title').toPromise(),
      message: await this.translateService.get('jgsm_cont').toPromise(),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();
  }

  async approve() {
    if (!this.fromCoin.isApproved) {
      this.isLoading.sq = true;
      this.cofixService
        .approve(
          this.fromCoin.address,
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
            console.log(error);

            this.isLoading.sq = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading.sq = false;
        });
    }
  }

  async swap() {
    this.isLoading.dh = true;
    if (this.fromCoin.id === 'ETH') {
      this.cofixService
        .swapExactETHForTokens(
          this.shareStateQuery.getValue().tokenPairAddress[this.toCoin.id],
          this.toCoin.address,
          Number(this.fromCoin.amount),
          Number(this.toCoin.amount),
          Number(this.changePrice),
          this.oracleCost
        )
        .then((tx: any) => {
          console.log('tx.hash', tx.hash);
          const provider = this.cofixService.getCurrentProvider();
          provider.once(tx.hash, (transactionReceipt) => {
            this.isLoading.dh = false;
            this.initCoinContent();
          });
          provider.once('error', (error) => {
            console.log(error);

            this.isLoading.dh = false;
          });
        })
        .catch((error) => {
          console.log(error.message);
          //if()
          if (error.message === 'Insufficient tokens for swapping.') {
            this.isInsufficientError = true;
          }
          this.isLoading.dh = false;
        });
    } else {
      if (this.toCoin.id === 'ETH') {
        this.cofixService
          .swapExactTokensForETH(
            this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id],
            this.fromCoin.address,
            Number(this.fromCoin.amount),
            Number(this.toCoin.amount),
            Number(this.changePrice),
            this.oracleCost
          )
          .then((tx: any) => {
            console.log('tx.hash', tx.hash);
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;

              this.initCoinContent();
            });
            provider.once('error', (error) => {
              console.log(error);
              this.isLoading.dh = false;
            });
          })
          .catch((error) => {
            console.log(error);
            this.isLoading.dh = false;
          });
      } else {
        const amountOut = await this.cofixService.executionPriceAndExpectedCofi(
          this.fromCoin.address,
          this.toCoin.address,
          Number(this.fromCoin.amount)
        );
        await this.cofixService
          .swapExactTokensForTokens(
            this.shareStateQuery.getValue().tokenPairAddress[this.fromCoin.id],
            this.fromCoin.address,
            this.shareStateQuery.getValue().tokenPairAddress[this.toCoin.id],
            this.toCoin.address,
            Number(this.fromCoin.amount),
            amountOut.excutionPrice,
            Number(this.changePrice),
            this.oracleCost
          )
          .then((tx: any) => {
            console.log('tx.hash', tx.hash);
            const provider = this.cofixService.getCurrentProvider();
            provider.once(tx.hash, (transactionReceipt) => {
              this.isLoading.dh = false;
              this.initCoinContent();
            });
            provider.once('error', (error) => {
              console.log(error);
              this.isLoading.dh = false;
            });
          })
          .catch((error) => {
            console.log(error);
            this.isLoading.dh = false;
          });
      }
    }
  }

  canSwap() {
    return (
      ((this.fromCoin.id === 'ETH' &&
        Number(this.fromCoin.amount) !== 0 &&
        Number(this.fromCoin.amount) <= Number(this.fromCoin.balance)) ||
        (this.fromCoin.id !== 'ETH' &&
          this.fromCoin.isApproved &&
          Number(this.fromCoin.amount) !== 0 &&
          Number(this.fromCoin.amount) <= Number(this.fromCoin.balance))) &&
      Number(this.toCoin.amount) < this.ERC20BalanceOfPair[this.toCoin.id]
    );
  }
}
