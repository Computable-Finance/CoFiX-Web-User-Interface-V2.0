import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TokensInfoModel, TokensInfoStore } from './token.store';

@Injectable({ providedIn: 'root' })
export class TokensInfoQuery extends Query<TokensInfoModel> {
  constructor(protected store: TokensInfoStore) {
    super(store);
  }

  getDecimals(key: string) {
    return this.getValueOfProperty(key, 'decimals');
  }
  getPairAddress(key: string) {
    return this.getValueOfProperty(key, 'pairAddress');
  }
  getStakingPoolAddress(key: string) {
    return this.getValueOfProperty(key, 'stakingPoolAddress');
  }
  getXtTokenAddress(key: string) {
    return this.getValueOfProperty(key, 'xtTokenAddress');
  }

  private getValueOfProperty(key: string, property: string) {
    const value = this.store.getValue();
    const info = value[key];
    if (info !== undefined) {
      return info[property];
    }

    return info;
  }
}
