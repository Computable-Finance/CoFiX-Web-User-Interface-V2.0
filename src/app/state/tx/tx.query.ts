import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CofiXService } from 'src/app/service/cofix.service';

import { TxModel, TxStore } from './tx.store';

@Injectable({ providedIn: 'root' })
export class TxQuery extends QueryEntity<TxModel> {
  constructor(protected store: TxStore, private cofixService: CofiXService) {
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
    console.log(account);
    console.log(network);
    return this.selectAll({
      filterBy: (entity) =>
        entity.account === account && entity.network === network,
    });
  }
}
