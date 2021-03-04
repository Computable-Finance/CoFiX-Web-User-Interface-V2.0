import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface CurrentAccountModel {
  currentAccount?: string;
}

export function createInitialState(): CurrentAccountModel {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'current-account' })
export class CurrentAccountStore extends Store<CurrentAccountModel> {
  constructor() {
    super(createInitialState());
  }
}
