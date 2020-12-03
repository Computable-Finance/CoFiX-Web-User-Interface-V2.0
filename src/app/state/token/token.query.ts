import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TokensInfoModel, TokensInfoStore } from './token.store';

@Injectable({ providedIn: 'root' })
export class TokensInfoQuery extends Query<TokensInfoModel> {
  constructor(protected store: TokensInfoStore) {
    super(store);
  }

  getDecimals(address: string) {
    return this.getValueOfProperty(address, 'decimals');
  }

  getPairAddress(address: string) {
    return this.getValueOfProperty(address, 'pairAddress');
  }

  getStakingPoolAddress(address: string) {
    return this.getValueOfProperty(address, 'stakingPoolAddress');
  }

  private getValueOfProperty(address: string, property: string) {
    const value = this.store.getValue();
    const info = value[address];
    if (info !== undefined) {
      return info[property];
    }

    return info;
  }
}
