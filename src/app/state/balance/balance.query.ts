import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BalancesModel, BalancesStore } from './balance.store';

@Injectable({ providedIn: 'root' })
export class BalancesQuery extends Query<BalancesModel> {
  constructor(protected store: BalancesStore) {
    super(store);
  }

  currentETHBalance$(account: string) {
    return this.select((state) => state[account].ethBalance);
  }

  currentERC20Balance$(account: string, address: string) {
    return this.select((state) => state[account].erc20Balances[address]);
  }

  currentUnclaimedCoFi$(account: string, address: string) {
    return this.select((state) => state[account].unclaimedCoFis[address]);
  }

  currentDividendBalance$(account: string) {
    return this.select((state) => state[account].dividend);
  }

  getBalancesByAccount(account: string) {
    return this.store.getValue()[account];
  }
}
