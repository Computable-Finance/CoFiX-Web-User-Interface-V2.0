import { Component, ViewChild } from '@angular/core';
import { init } from '@datorama/akita-ngdevtools';
import { IonInfiniteScroll, ModalController, NavParams } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { getTokenListByQuery } from 'src/app/common/TokenList';
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

  selectCoin(event, coin) {
    if (event.srcElement.id === 'remove') {
      if (this.selectedCoin === coin.symbol) {
        return;
      }
      this.myTokenService.remove(coin.id);
      this.getTokenList();
    } else {
      this.modalController.dismiss(coin.symbol);
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
