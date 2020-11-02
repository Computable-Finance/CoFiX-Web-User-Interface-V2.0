import { Injectable } from '@angular/core';

import { BalancesStore } from './balance.store';

@Injectable({ providedIn: 'root' })
export class BalancesService {
  constructor(private store: BalancesStore) {}

  updateEthBalance(account: string, ethBalance: string) {
    this.createOrUpdate(account, 'ethBalance', ethBalance);
  }

  updateERC20Balance(
    account: string,
    erc20Balance: { [address: string]: string }
  ) {
    this.createOrUpdate(account, 'erc20Balances', erc20Balance);
  }

  updateUnclaimedCoFi(
    account: string,
    unclaimedCoFi: {
      [address: string]: string;
    }
  ) {
    this.createOrUpdate(account, 'unclaimedCoFis', unclaimedCoFi);
  }

  updateDividend(account: string, dividend: string) {
    this.createOrUpdate(account, 'dividend', dividend);
  }

  private createOrUpdate(account: string, property: string, content) {
    const value = this.store.getValue();
    if (!value[account]) {
      value[account] = {};
    }

    if (typeof content === 'string') {
      value[account][property] = content;
    } else if (typeof content === 'object') {
      if (!value[account][property]) {
        value[account][property] = {};
      }
      Object.keys(content).forEach(
        (key) => (value[account][property][key] = content[key])
      );
    } else {
      throw new Error(
        `Not Supported type of content: ${typeof content}, value: ${content}`
      );
    }

    this.store.update(value);
  }
}
