import { Injectable } from '@angular/core';
import { tokenLogo, tokens } from 'src/app/common/TokenList';

import { MyTokenStore } from './myToken.store';

@Injectable({ providedIn: 'root' })
export class MyTokenService {
  constructor(private store: MyTokenStore) {}

  add(chainId, address, symbol, decimals) {
    const newToken = {
      chainId,
      address,
      name: symbol,
      symbol,
      decimals,
      logoURI: tokenLogo(symbol) || './assets/images/icon/UNKNOWN.png',
      id: `${chainId}-${address}`,
    };

    this.store.add(newToken);
    tokens.splice(
      tokens.filter((token) => token.id !== undefined).length + 2,
      0,
      newToken
    );

    return newToken;
  }

  remove(id: string) {
    this.store.remove(id);
    tokens.splice(
      tokens.findIndex((token) => token.id === id),
      1
    );
  }
}
