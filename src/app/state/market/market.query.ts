import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MarketDetailsModel, MarketDetailsStore } from './market.store';

@Injectable({ providedIn: 'root' })
export class MarketDetailsQuery extends Query<MarketDetailsModel> {
  constructor(protected store: MarketDetailsStore) {
    super(store);
  }

  marketDetails$(address: string, key: string) {
    return this.select((state) => state[address][key]);
  }

  getKInfo(address: string) {
    return this.getValueOfProperty(address, 'kinfo');
  }

  getCheckedPriceNow(address: string) {
    return this.getValueOfProperty(address, 'checkedPriceNow');
  }

  getNavPerShare(address: string) {
    return this.getValueOfProperty(address, 'navPerShare');
  }

  getRewardRate(address: string) {
    return this.getValueOfProperty(address, 'rewardRate');
  }

  private getValueOfProperty(address: string, property: string) {
    const value = this.store.getValue();
    const details = value[address];
    if (details !== undefined) {
      return details[property];
    }

    return details;
  }
}
