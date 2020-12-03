import { enableAkitaProdMode } from '@datorama/akita';

import { TokensInfoQuery } from './token.query';
import { TokenInfoService } from './token.service';
import { TokensInfoStore } from './token.store';

describe('Token State Management', () => {
  let store: TokensInfoStore;
  let query: TokensInfoQuery;
  let service: TokenInfoService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new TokensInfoStore();
    query = new TokensInfoQuery(store);
    service = new TokenInfoService(store);
  });

  it('should updateTokenInfo with a whole object', () => {
    service.updateTokenInfo('testCoin', {
      decimals: '18',
      pairAddress: 'address1',
      stakingPoolAddress: 'address2',
    });

    expect(query.getDecimals('testCoin')).toEqual('18');
    expect(query.getPairAddress('testCoin')).toEqual('address1');
    expect(query.getStakingPoolAddress('testCoin')).toEqual('address2');
  });

  it('should updateTokenInfo with a partial object', () => {
    service.updateTokenInfo('testCoin', {
      decimals: '18',
    });

    expect(query.getDecimals('testCoin')).toEqual('18');

    service.updateTokenInfo('testCoin', {
      pairAddress: 'address1',
    });
    expect(query.getPairAddress('testCoin')).toEqual('address1');

    service.updateTokenInfo('testCoin', {
      stakingPoolAddress: 'address2',
    });
    expect(query.getStakingPoolAddress('testCoin')).toEqual('address2');
  });
});
