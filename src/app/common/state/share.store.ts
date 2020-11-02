import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { environment } from 'src/environments/environment';

export interface ShareState {
  activeTab: string;
  pairAttended: any;
  lang: string;
  knownRisk: boolean;
  knownRiskForAdd: boolean;
}

export function createInitialState(activeTab): ShareState {
  return {
    activeTab,
    pairAttended: { USDT: false, HBTC: false },
    lang: environment.lang,
    knownRisk: false,
    knownRiskForAdd: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cofiState' })
export class ShareStateStore extends Store<ShareState> {
  constructor() {
    super(createInitialState('swap'));
  }
}
