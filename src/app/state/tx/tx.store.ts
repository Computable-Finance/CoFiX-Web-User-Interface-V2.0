import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export type TX_STATUS = 'success' | 'pending' | 'error';

export interface TxDetails {
  txHash: string;
  activity: string;
  network: string;
  status: TX_STATUS;
}

export interface TxModel extends EntityState<TxDetails, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tx', idKey: 'txHash' })
export class TxStore extends EntityStore<TxModel> {
  constructor() {
    super();
  }
}
