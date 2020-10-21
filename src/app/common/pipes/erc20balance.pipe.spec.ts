import { ethers } from 'ethers';
import { ERC20BalancePipe } from './erc20balance.pipe';

describe('ERC20BalancePipe', () => {
  const pipe = new ERC20BalancePipe();

  it('should truncate a number to precision 8 without rounding', () => {
    expect(pipe.transform(ethers.utils.parseUnits('1.234567891', 18))).toBe(
      '1.23456789'
    );
    expect(pipe.transform(ethers.utils.parseUnits('1.23456789', 18))).toBe(
      '1.23456789'
    );
    expect(pipe.transform(ethers.utils.parseUnits('1.234567899', 18))).toBe(
      '1.23456789'
    );
  });

  it('should not truncate a number without precision 8', () => {
    expect(pipe.transform(ethers.utils.parseUnits('1.234', 18))).toBe('1.234');
  });

  it('should not truncate a int', () => {
    expect(pipe.transform(ethers.utils.parseUnits('123456789', 18))).toBe(
      '123456789'
    );
  });

  it('should show 0 for 0.000000000', () => {
    expect(pipe.transform(ethers.utils.parseUnits('0', 18))).toBe('0');
    expect(pipe.transform(ethers.utils.parseUnits('0.0', 18))).toBe('0');
    expect(pipe.transform(ethers.utils.parseUnits('0.00', 18))).toBe('0');
  });
});
