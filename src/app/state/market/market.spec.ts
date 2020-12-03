import { enableAkitaProdMode } from '@datorama/akita';
import { MarketDetailsQuery } from './market.query';
import { MarketDetailsService } from './market.service';
import { MarketDetailsStore } from './market.store';

describe('Market Details State Management', () => {
  let store: MarketDetailsStore;
  let query: MarketDetailsQuery;
  let service: MarketDetailsService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new MarketDetailsStore();
    query = new MarketDetailsQuery(store);
    service = new MarketDetailsService(store);
  });

  it('should update kinfo', () => {
    let kinfoFromQuery;
    service.updateMarketDetails('testCoin', {
      kinfo: {
        kOriginal: '1',
        k: '2',
        theta: '3',
      },
    });

    const subscription = query
      .marketDetails$('testCoin', 'kinfo')
      .subscribe((res) => {
        kinfoFromQuery = res;
      });
    expect(kinfoFromQuery.kOriginal).toEqual('1');
    expect(kinfoFromQuery.k).toEqual('2');
    expect(kinfoFromQuery.theta).toEqual('3');

    const kinfo = query.getKInfo('testCoin');
    expect(kinfo.kOriginal).toEqual('1');
    expect(kinfo.k).toEqual('2');
    expect(kinfo.theta).toEqual('3');

    subscription.unsubscribe();
  });

  it('should update checkedPriceNow', () => {
    let ethAmount;
    let erc20Amount;
    let changePrice;

    service.updateMarketDetails('testCoin', {
      checkedPriceNow: {
        ethAmount: '1',
        erc20Amount: '2',
        changePrice: '3',
      },
    });

    const subscription1 = query
      .marketDetails$('testCoin', 'checkedPriceNow', 'ethAmount')
      .subscribe((res) => {
        ethAmount = res;
      });
    const subscription2 = query
      .marketDetails$('testCoin', 'checkedPriceNow', 'erc20Amount')
      .subscribe((res) => {
        erc20Amount = res;
      });
    const subscription3 = query
      .marketDetails$('testCoin', 'checkedPriceNow', 'changePrice')
      .subscribe((res) => {
        changePrice = res;
      });

    expect(ethAmount).toEqual('1');
    expect(erc20Amount).toEqual('2');
    expect(changePrice).toEqual('3');

    const price = query.getCheckedPriceNow('testCoin');
    expect(price.ethAmount).toEqual('1');
    expect(price.erc20Amount).toEqual('2');
    expect(price.changePrice).toEqual('3');

    subscription1.unsubscribe();
    subscription2.unsubscribe();
    subscription3.unsubscribe();
  });

  it('should update navPerShare', () => {
    let navPerShareFromQuery;
    service.updateMarketDetails('testCoin', {
      navPerShare: '1234',
    });

    const subscription = query
      .marketDetails$('testCoin', 'navPerShare')
      .subscribe((res) => {
        navPerShareFromQuery = res;
      });
    expect(navPerShareFromQuery).toEqual('1234');

    const navPerShare = query.getNavPerShare('testCoin');
    expect(navPerShare).toEqual('1234');

    subscription.unsubscribe();
  });

  it('should update rewardRate', () => {
    let rewardRateFromQuery;
    service.updateMarketDetails('testCoin', {
      rewardRate: '1234',
    });

    const subscription = query
      .marketDetails$('testCoin', 'rewardRate')
      .subscribe((res) => {
        rewardRateFromQuery = res;
      });
    expect(rewardRateFromQuery).toEqual('1234');

    const rewardRate = query.getRewardRate('testCoin');
    expect(rewardRate).toEqual('1234');

    subscription.unsubscribe();
  });
});
