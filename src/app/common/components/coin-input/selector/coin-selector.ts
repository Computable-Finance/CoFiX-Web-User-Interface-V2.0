import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TOKENS } from 'src/app/common/constants';
import { CofiXService } from 'src/app/service/cofix.service';

@Component({
  selector: 'app-coin-selector',
  templateUrl: './coin-selector.html',
  styleUrls: ['./coin-selector.scss'],
})
export class CoinSelector {
  coinList = TOKENS;
  queryToken: string;

  constructor(
    private modalController: ModalController,
    private cofixService: CofiXService
  ) {}

  selectCoin(coin) {
    this.modalController.dismiss(coin);
  }

  close() {
    this.modalController.dismiss();
  }

  async searchToken(event) {
    if (!this.queryToken.toUpperCase()) {
      this.coinList = TOKENS;
    } else {
      if (this.isValidAddress(this.queryToken)) {
        const newToken = await this.cofixService.loadToken(this.queryToken);
        if (newToken) {
          this.coinList = [newToken];
        } else {
          this.coinList = [];
        }
      } else {
        this.coinList = TOKENS.filter(
          (el) => el.indexOf(this.queryToken.toUpperCase()) > -1
        );
      }
    }
  }

  isValidAddress(address: string) {
    return address.indexOf('0x') > -1 && address.length === 42;
  }
}
