import { Injectable } from '@angular/core';

import { TxStore } from './tx.store';

@Injectable({ providedIn: 'root' })
export class TxService {
  constructor(private store: TxStore) {}

  add(txHash: string, account: string, activity: string, network: string) {
    this.store.add({ txHash, account, activity, network, status: 'pending' });
  }

  txSucceeded(txHash: string) {
    this.store.update(txHash, { status: 'success' });
  }

  txFailed(txHash: string) {
    this.store.update(txHash, { status: 'error' });
  }
}
