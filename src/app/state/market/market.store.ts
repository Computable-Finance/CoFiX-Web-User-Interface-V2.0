import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface MarketDetails {
  kinfo: { kOriginal: string; k: string; theta: string };
  checkedPriceNow: {
    ethAmount: string;
    erc20Amount: string;
    changePrice: string;
    vola: string;
    bn: string;
  };
  navPerShare: string;
  rewardRate: string;
  initialAssetRatio: {
    ethAmount: string;
    erc20Amount: string;
  };
}

export interface MarketDetailsModel {
  [address: string]: Partial<MarketDetails>;
}

export function createInitialState(): MarketDetailsModel {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'market-details' })
export class MarketDetailsStore extends Store<MarketDetailsModel> {
  constructor() {
    super(createInitialState());
  }
}
