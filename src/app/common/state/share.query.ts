import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ShareState, ShareStateStore } from './share.store';

@Injectable({ providedIn: 'root' })
export class ShareStateQuery extends Query<ShareState> {
  constructor(protected store: ShareStateStore) {
    super(store);
  }
}
