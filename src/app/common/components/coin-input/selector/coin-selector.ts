import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { getTokenListByQuery } from 'src/app/common/TokenList';
import { CofiXService } from 'src/app/service/cofix.service';

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
  pageindex: number = 1;
  constructor(
    private modalController: ModalController,
    private cofixService: CofiXService
  ) {
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

  getTokenList() {
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
  }

  init() {
    this.pageindex = 1;
    this.q.offset = 0;
  }

  selectCoin(coin) {
    this.modalController.dismiss(coin.symbol);
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
          this.coinList = [newToken];
        } else {
          this.coinList = [];
        }
      } else {
        this.getTokenList();
      }
    }
  }

  isValidAddress(address: string) {
    return address.indexOf('0x') > -1 && address.length === 42;
  }
}
