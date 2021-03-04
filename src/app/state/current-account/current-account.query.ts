import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  CurrentAccountModel,
  CurrentAccountStore,
} from './current-account.store';

@Injectable({ providedIn: 'root' })
export class CurrentAccountQuery extends Query<CurrentAccountModel> {
  constructor(protected store: CurrentAccountStore) {
    super(store);
  }

  currentAccount$() {
    return this.select('currentAccount');
  }

  currentAccount() {
    return this.getValue().currentAccount;
  }
}
