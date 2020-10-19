import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { environment } from 'src/environments/environment';

export interface ShareState {
  connectedWallet: boolean;
  currentAccount: string;
  activeTab: string;
  tokenPairAddress: any;
  stakingPoolAddress: any;
  erc20Decimals: any;
  pairAttended: any;
  lang: string;
  knownRisk: boolean;
}

export function createInitialState(activeTab): ShareState {
  return {
    connectedWallet: false,
    currentAccount: '',
    activeTab: activeTab,
    tokenPairAddress: { USDT: '', HBTC: '' },
    stakingPoolAddress: { USDT: '', HBTC: '' },
    erc20Decimals: { USDT: 0, HBTC: 0 },
    pairAttended: { USDT: 0, HBTC: 0 },
    lang: environment.lang,
    knownRisk: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cofiState' })
export class ShareStateStore extends Store<ShareState> {
  constructor() {
    super(createInitialState('swap'));
  }
}
