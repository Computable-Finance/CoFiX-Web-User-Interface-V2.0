import { Injectable } from '@angular/core';

import { CurrentAccountStore } from './current-account.store';

@Injectable({ providedIn: 'root' })
export class CurrentAccountService {
  constructor(private store: CurrentAccountStore) {}

  update(currentAccount: string) {
    this.store.update({ currentAccount });
  }

  reset() {
    this.store.reset();
  }
}
