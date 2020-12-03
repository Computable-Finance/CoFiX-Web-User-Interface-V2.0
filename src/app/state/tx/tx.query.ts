import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';

import { TxModel, TxStore } from './tx.store';

@Injectable({ providedIn: 'root' })
export class TxQuery extends QueryEntity<TxModel> {
  constructor(protected store: TxStore) {
    super(store);
  }

  pendingTxCount$(account: string, network: string) {
    return this.selectCount(
      (tx) =>
        tx.status === 'pending' &&
        tx.account === account &&
        tx.network === network
    );
  }

  tx$(account: string, network: string) {
    return this.selectAll({
      filterBy: (entity) =>
        entity.account === account && entity.network === network,
    }).pipe(map((txs) => txs.reverse()));
  }
}
