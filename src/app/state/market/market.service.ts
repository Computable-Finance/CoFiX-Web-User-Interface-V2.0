import { Injectable } from '@angular/core';

import { MarketDetails, MarketDetailsStore } from './market.store';

@Injectable({ providedIn: 'root' })
export class MarketDetailsService {
  constructor(private store: MarketDetailsStore) {}

  updateMarketDetails(address: string, marketDetails: Partial<MarketDetails>) {
    const value = this.store.getValue();
    const details = value[address];
    if (details !== undefined) {
      Object.keys(marketDetails).forEach(
        (k) => (details[k] = marketDetails[k])
      );
    } else {
      value[address] = marketDetails;
    }
    this.store.update(value);
  }
}
