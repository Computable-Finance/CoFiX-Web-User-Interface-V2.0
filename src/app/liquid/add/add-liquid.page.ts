import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { Utils } from 'src/app/common/utils';
import { CofiXService } from 'src/app/service/cofix.service';
import { CoinContent } from 'src/app/swap/swap.page';

@Component({
  selector: 'app-add-liquid',
  templateUrl: './add-liquid.page.html',
  styleUrls: ['./add-liquid.page.scss'],
})
export class AddLiquidPage implements OnInit {
  @Input() coin: string;
  @Input() pairAttended: boolean = false;
  @Output() onClose = new EventEmitter<any>();
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
  isDropDown: false;
  xtValue = 'XT-1';
  isStake = true;
  expectedXToken: string;
  earnedRate: any;
  coinAddress: string;
  todoValue: string;
  hadValue: string;
  NAVPerShare: string;
  oracleCost = 0.01;
  isLoading = { cr: false, sq: false };
  //showError = false;
  showFromError = false;
  showToError = false;
  constructor(
    private cofixService: CofiXService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils
  ) {}

  ngOnInit() {
    this.toCoin.id = this.coin;
    this.initCoinContent();
    this.getIsApproved();
  }

  async getIsApproved() {
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.toCoin.isApproved = await this.cofixService.approved(
        this.toCoin.address,
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
    this.showFromError = false;
    this.setExpectedXToken();
  }

  canShowError() {
    this.showFromError =
      Number(this.fromCoin.amount) > Number(this.fromCoin.balance);
    this.showToError = Number(this.toCoin.amount) > Number(this.toCoin.balance);
  }

  async setExpectedXToken() {
    this.expectedXToken = (
      await this.cofixService.expectedXToken(
        this.toCoin.address,
        Number(this.fromCoin.amount),
        Number(this.toCoin.amount)
      )
    ).toString();
  }

  async setToCoinMax(event) {
    if (!this.shareStateQuery.getValue().connectedWallet) {
      return false;
    }
    this.toCoin.id = event.coin;
    this.toCoin.amount = this.toCoin.balance;
    this.showToError = false;
    this.setExpectedXToken();
  }

  cancel(event) {
    this.onClose.emit({ type: 'cancel', toCoin: this.toCoin });
  }

  async confirmAddLiquid() {
    if (!this.fromCoin.amount && !this.toCoin.amount) {
      return false;
    }
    this.isLoading.cr = true;
    await this.cofixService
      .addLiquidity(
        this.toCoin.address,
        Number(this.fromCoin.amount),
        Number(this.toCoin.amount),
        await this.cofixService.expectedXToken(
          this.toCoin.address,
          Number(this.fromCoin.amount),
          Number(this.toCoin.amount)
        ),
        this.oracleCost,
        this.isStake
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoading.cr = false;
          this.onClose.emit({
            type: 'add',
            fromCoin: this.fromCoin,
            toCoin: this.toCoin,
          });
        });
        provider.once('error', (error) => {
          console.log(error);

          this.isLoading.cr = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading.cr = false;
      });
  }

  async approve() {
    if (!this.toCoin.isApproved) {
      this.isLoading.sq = true;
      this.cofixService
        .approve(
          this.toCoin.address,
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

  checkAdd() {
    this.isStake = !this.isStake;
  }

  changeCoin(event) {
    this.toCoin.id = event.coin;
    if (event.coin === 'USDT') {
      this.xtValue = 'XT-1';
    } else {
      this.xtValue = 'XT-2';
    }
    this.initCoinContent();
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.expectedXToken = '';
    this.showToError = false;
    this.showFromError = false;
    if (this.cofixService.getCurrentProvider) {
      this.fromCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.fromCoin.id
      ];
      this.toCoin.address = this.cofixService.getCurrentContractAddressList()[
        this.toCoin.id
      ];
    }
    if (this.shareStateQuery.getValue().connectedWallet) {
      this.fromCoin.balance = await this.utils.getBalanceByCoin(this.fromCoin);
      this.toCoin.balance = await this.utils.getBalanceByCoin(this.toCoin);
    }
  }

  async walletConnected() {
    this.initCoinContent();
  }

  async fromCoinInput(event) {
    this.fromCoin.amount = event.amount;
    this.setExpectedXToken();
    this.canShowError();
  }

  async toCoinInput(event) {
    this.toCoin.amount = event.amount;
    this.setExpectedXToken();
    this.canShowError();
  }

  canAdd() {
    return (
      this.toCoin.isApproved &&
      !(
        Number(this.fromCoin.amount) === 0 && Number(this.toCoin.amount) === 0
      ) &&
      Number(this.fromCoin.amount) <= Number(this.fromCoin.balance) &&
      Number(this.toCoin.amount) <= Number(this.toCoin.balance)
    );
  }

  canApprove() {
    return (
      this.shareStateQuery.getValue().connectedWallet &&
      !this.toCoin.isApproved &&
      Number(this.toCoin.amount) > 0
    );
  }
}