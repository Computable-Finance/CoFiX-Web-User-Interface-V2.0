import { Injectable } from '@angular/core';

import { TokenInfo, TokensInfoStore } from './token.store';

@Injectable({ providedIn: 'root' })
export class TokenInfoService {
  constructor(private store: TokensInfoStore) {}

  updateTokenInfo(address: string, tokenInfo: Partial<TokenInfo>) {
    const value = this.store.getValue();
    const info = value[address];
    if (info !== undefined) {
      Object.keys(tokenInfo).forEach((k) => (info[k] = tokenInfo[k]));
    } else {
      value[address] = tokenInfo;
    }
    this.store.update(value);
  }
}
