import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface TokenInfo {
  decimals: string;
  pairAddress: string;
  stakingPoolAddress: string;
  xtTokenAddress: string;
}

export interface TokensInfoModel {
  [key: string]: Partial<TokenInfo>;
}

export function createInitialState(): TokensInfoModel {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'token-info' })
export class TokensInfoStore extends Store<TokensInfoModel> {
  constructor() {
    super(createInitialState());
  }
}
