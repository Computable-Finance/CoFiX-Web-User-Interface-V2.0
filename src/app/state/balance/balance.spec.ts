import { enableAkitaProdMode } from '@datorama/akita';
import { BalancesQuery } from './balance.query';
import { BalancesService } from './balance.service';
import { BalancesStore } from './balance.store';

describe('Balance State Management', () => {
  let store: BalancesStore;
  let query: BalancesQuery;
  let service: BalancesService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new BalancesStore();
    query = new BalancesQuery(store);
    service = new BalancesService(store);
  });

  it('should updateEthBalance', () => {
    let balance;
    service.updateEthBalance('test', '1234');
    const subscription = query.currentETHBalance$('test').subscribe((b) => {
      balance = b;
    });
    expect(balance).toEqual('1234');
    subscription.unsubscribe();
  });

  it('should updateERC20Balance', () => {
    let balance;
    service.updateERC20Balance('test', {
      testCoin: '1234',
    });
    const subscription = query
      .currentERC20Balance$('test', 'testCoin')
      .subscribe((b) => {
        balance = b;
      });
    expect(balance).toEqual('1234');
    subscription.unsubscribe();
  });

  it('should updateUnclaimedCoFi', () => {
    let balance;
    service.updateUnclaimedCoFi('test', {
      testCoin: '1234',
    });
    const subscription = query
      .currentUnclaimedCoFi$('test', 'testCoin')
      .subscribe((b) => {
        balance = b;
      });
    expect(balance).toEqual('1234');
    subscription.unsubscribe();
  });

  it('should updateDividend', () => {
    let dividend;
    service.updateDividend('test', '1234');
    const subscription = query
      .currentDividendBalance$('test')
      .subscribe((b) => {
        dividend = b;
      });
    expect(dividend).toEqual('1234');
    subscription.unsubscribe();
  });

  it('should getBalancesByAccount', () => {
    service.updateEthBalance('test', '1234');
    service.updateERC20Balance('test', {
      testCoin: '1234',
    });
    service.updateUnclaimedCoFi('test', {
      testCoin: '1234',
    });
    service.updateDividend('test', '1234');
    const balances = query.getBalancesByAccount('test');
    expect(JSON.stringify(balances)).toEqual(
      JSON.stringify({
        ethBalance: '1234',
        erc20Balances: {
          testCoin: '1234',
        },
        unclaimedCoFis: {
          testCoin: '1234',
        },
        dividend: '1234',
      })
    );
  });
});
