import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ERC20Balances {
  [address: string]: string;
}

export interface UnclaimedCoFis {
  [address: string]: string;
}

export interface AccountBalance {
  ethBalance: string;
  erc20Balances: ERC20Balances;
  unclaimedCoFis: UnclaimedCoFis;
  dividend: string;
}

export interface BalancesModel {
  [account: string]: Partial<AccountBalance>;
}

export function createInitialState(): BalancesModel {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'balances' })
export class BalancesStore extends Store<BalancesModel> {
  constructor() {
    super(createInitialState());
  }
}
