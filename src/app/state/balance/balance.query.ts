import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BalancesModel, BalancesStore } from './balance.store';

@Injectable({ providedIn: 'root' })
export class BalancesQuery extends Query<BalancesModel> {
  constructor(protected store: BalancesStore) {
    super(store);
  }

  observeBalancesByAccount(account: string) {
    return this.select(account);
  }

  getBalancesByAccount(account: string) {
    return this.store.getValue()[account];
  }
}
