import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { TxModel, TxStore } from './tx.store';

@Injectable({ providedIn: 'root' })
export class TxQuery extends QueryEntity<TxModel> {
  constructor(protected store: TxStore) {
    super(store);
  }

  lastPendingTx$ = this.selectLast((tx) => tx.status === 'pending');
  tx$ = this.selectAll();
}