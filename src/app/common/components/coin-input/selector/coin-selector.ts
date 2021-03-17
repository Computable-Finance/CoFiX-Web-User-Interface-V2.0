import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, NavParams } from '@ionic/angular';
import { getTokenListByQuery, tokens } from 'src/app/common/TokenList';
import { CofiXService } from 'src/app/service/cofix.service';
import { MyTokenService } from 'src/app/state/mytoken/myToken.service';

@Component({
  selector: 'app-coin-selector',
  templateUrl: './coin-selector.html',
  styleUrls: ['./coin-selector.scss'],
})
export class CoinSelector {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;
  coinList = [];
  queryToken: string;
  tokenCount: number;
  q = { max: 7, offset: 0 };
  pageindex = 1;
  selectedCoin: string;

  constructor(
    private modalController: ModalController,
    private cofixService: CofiXService,
    private myTokenService: MyTokenService,
    private params: NavParams
  ) {
    this.selectedCoin = params.get('selectedCoin');
    this.getTokenList();
  }

  loadData(event) {
    event.target.complete();
    if (Number(this.q.max) * this.pageindex <= this.tokenCount) {
      this.pageindex += 1;
      this.q.offset = (this.pageindex - 1) * Number(this.q.max);
      this.getTokenList();
    } else {
      event.target.complete();
    }
  }

  async getTokenList() {
    const tokenList = getTokenListByQuery(
      this.cofixService.getCurrentNetwork(),
      this.q.offset,
      this.q.max,
      this.queryToken
    );
    this.tokenCount = tokenList.total;
    if (this.pageindex > 1) {
      this.coinList = this.coinList.concat(tokenList.dataList);
    } else {
      this.coinList = tokenList.dataList;
    }
    this.coinList.forEach(async (coin) => {
      if (coin.symbol === 'ETH') {
        coin.balance = await this.cofixService.getETHBalance();
      } else {
        coin.balance = await this.cofixService.getERC20BalanceForSelect(
          coin.address,
          coin.decimals
        );
      }
    });
  }

  isMyFavoriteToken(address: string) {
    return this.cofixService.getExistMyToken(address);
  }

  init() {
    this.pageindex = 1;
    this.q.offset = 0;
  }

  selectCoin(event, coin) {
    if (event.srcElement.id === 'remove') {
      if (this.selectedCoin === coin.symbol) {
        return;
      }
      this.myTokenService.remove(coin.id);
      this.getTokenList();
    } else {
      this.modalController.dismiss(this.genInternalCoinId(coin));
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async searchToken(event) {
    this.init();
    if (!this.queryToken.toUpperCase()) {
      this.getTokenList();
    } else {
      if (this.isValidAddress(this.queryToken)) {
        const newToken = await this.cofixService.loadToken(this.queryToken);
        if (newToken) {
          newToken.balance = await this.cofixService.getERC20BalanceForSelect(
            newToken.address,
            newToken.decimals
          );
          this.coinList = [newToken];
        } else {
          this.coinList = [];
        }
      } else {
        this.getTokenList();
      }
    }
  }

  genInternalCoinId(coin) {
    const count = tokens.filter(
      (token) =>
        token.chainId === this.cofixService.getCurrentNetwork() &&
        token.symbol === coin.symbol
    ).length;

    if (count > 1) {
      return coin.address;
    } else {
      return coin.symbol;
    }
  }

  isValidAddress(address: string) {
    return address.indexOf('0x') > -1 && address.length === 42;
  }
}
