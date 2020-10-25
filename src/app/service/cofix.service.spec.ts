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

  it('should get executionPriceAndExpectedCofi: 1 eth -> n erc20', async () => {
    const result = await service.executionPriceAndExpectedCofi(
      undefined,
      USDT,
      '100'
    );

    expect(pipe.transform(result.excutionPriceForOne)).toBe('384.90905565');
    expect(pipe.transform(result.excutionPrice)).toBe('38490.905565');
    expect(pipe.transform(result.expectedCofi)).toBe('108');
  });

  it('should get executionPriceAndExpectedCofi: 1 erc20 -> n eth', async () => {
    const result = await service.executionPriceAndExpectedCofi(
      USDT,
      undefined,
      '1000'
    );

    expect(pipe.transform(result.excutionPriceForOne)).toBe('0.00257989');
    expect(pipe.transform(result.excutionPrice)).toBe('2.57989107');
    expect(pipe.transform(result.expectedCofi)).toBe('2.80305174');
  });

  it('should get executionPriceAndExpectedCofi: 1 erc20 -> n erc20', async () => {
    const result = await service.executionPriceAndExpectedCofi(
      USDT,
      HBTC,
      '1000'
    );

    expect(pipe.transform(result.excutionPriceForOne)).toBe('0.00008737');
    expect(pipe.transform(result.excutionPrice)).toBe('0.08737865');
    expect(pipe.transform(result.expectedCofi)).toBe('3.21539326');
  });

  it('should get expectedXToken: eth only', async () => {
    expect(pipe.transform(await service.expectedXToken(USDT, '1', '0'))).toBe(
      '0.65020385'
    );
  });

  it('should get expectedXToken: erc20 only', async () => {
    expect(pipe.transform(await service.expectedXToken(USDT, '0', '100'))).toBe(
      '0.16875404'
    );
  });

  it('should get expectedXToken: eth + erc20', async () => {
    expect(pipe.transform(await service.expectedXToken(USDT, '1', '100'))).toBe(
      '0.81895789'
    );
  });

  it('should get earnedCofiAndRewardRate', async () => {
    const result = await service.earnedCofiAndRewardRate(
      '0xA3904574E4Fbf7592B3A3c1439cAe97D5622FBFD'
    );

    expect(pipe.transform(result.earned)).toBe('0');
    expect(pipe.transform(result.rewardRate)).toBe('27771.3');
  });

  it('should getETHAmountForRemoveLiquidity', async () => {
    expect(
      pipe.transform(
        (
          await service.getETHAmountForRemoveLiquidity(
            USDT,
            '0x5f22a04F81A87a7aBe9191C338fA5Ba092Af4562',
            '1'
          )
        ).result
      )
    ).toBe('1.53538609');
  });

  it('should getTokenAmountForRemoveLiquidity', async () => {
    expect(
      pipe.transform(
        (
          await service.getTokenAmountForRemoveLiquidity(
            USDT,
            '0x5f22a04F81A87a7aBe9191C338fA5Ba092Af4562',
            '1'
          )
        ).result
      )
    ).toBe('591.57558687');
  });
});
