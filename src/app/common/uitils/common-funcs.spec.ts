import { txLink } from './common-funcs';

describe('CommonFuncs', () => {
  it('should go to etherscan.io if main net is used', () => {
    expect(txLink(1, 'xxx')).toEqual('https://etherscan.io/tx/xxx');
  });

  it('should go to ropsten.etherscan.io if ropsten net is used', () => {
    expect(txLink(3, 'xxx')).toEqual('https://ropsten.etherscan.io/tx/xxx');
  });
});
