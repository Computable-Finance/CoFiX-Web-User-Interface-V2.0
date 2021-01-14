import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MyToken {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  id: string;
}

export interface MyTokenModel extends EntityState<MyToken, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'my-tokens', idKey: 'id' })
export class MyTokenStore extends EntityStore<MyTokenModel> {
  constructor() {
    super();
  }
}
