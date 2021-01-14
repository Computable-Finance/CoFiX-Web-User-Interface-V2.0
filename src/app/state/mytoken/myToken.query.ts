import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { MyTokenModel, MyTokenStore } from './myToken.store';

@Injectable({ providedIn: 'root' })
export class MyTokenQuery extends QueryEntity<MyTokenModel> {
  constructor(protected store: MyTokenStore) {
    super(store);
  }
}
