import { getContractAddressListByNetwork } from '../common/constants';
import { BalancePipe } from '../common/pipes/balance.pipe';
import { CofiXService } from './cofix.service';

const USDT = getContractAddressListByNetwork(3).USDT;
const HBTC = getContractAddressListByNetwork(3).HBTC;

describe('CofiXService', () => {
  const service = new CofiXService(null, null, null);
  const pipe = new BalancePipe();

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  it('should get changePrice: 1 eth -> n erc20', async () => {
    expect(pipe.transform(await service.changePrice(undefined, USDT))).toBe(
      '384.90905565'
    );
  });

  it('should get changePrice: 1 erc20 -> n eth', async () => {
    expect(pipe.transform(await service.changePrice(USDT, undefined))).toBe(
      '0.00257989'
    );
  });

  it('should get changePrice: 1 erc20 -> n erc20', async () => {
    expect(pipe.transform(await service.changePrice(USDT, HBTC))).toBe(
      '0.00008737'
    );
  });
});
