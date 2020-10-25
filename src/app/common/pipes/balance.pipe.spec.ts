import { parseEthers } from '../uitils/bignumber-utils';
import { BalancePipe } from './balance.pipe';

describe('BalancePipe', () => {
  const pipe = new BalancePipe();

  it('should truncate a value to precision 8 without rounding', () => {
    expect(pipe.transform(1.234567891)).toBe('1.23456789');
    expect(pipe.transform('1.234567891')).toBe('1.23456789');
    expect(pipe.transform(parseEthers('1.234567891'))).toBe('1.23456789');

    expect(pipe.transform(1.23456789)).toBe('1.23456789');
    expect(pipe.transform('1.23456789')).toBe('1.23456789');
    expect(pipe.transform(parseEthers('1.23456789'))).toBe('1.23456789');

    expect(pipe.transform(1.234567899)).toBe('1.23456789');
    expect(pipe.transform('1.234567899')).toBe('1.23456789');
    expect(pipe.transform(parseEthers('1.234567899'))).toBe('1.23456789');
  });

  it('should not truncate a value without precision 8', () => {
    expect(pipe.transform(1.234)).toBe('1.234');
    expect(pipe.transform('1.234')).toBe('1.234');
    expect(pipe.transform(parseEthers('1.234'))).toBe('1.234');
  });

  it('should not truncate a int', () => {
    expect(pipe.transform(123456789)).toBe('123456789');
    expect(pipe.transform('123456789')).toBe('123456789');
    expect(pipe.transform(parseEthers('123456789'))).toBe('123456789');
  });

  it('should show 0 for 0.000000000', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform('0')).toBe('0');
    expect(pipe.transform(parseEthers('0'))).toBe('0');

    expect(pipe.transform(0.0)).toBe('0');
    expect(pipe.transform('0.0')).toBe('0');
    expect(pipe.transform(parseEthers('0.0'))).toBe('0');

    expect(pipe.transform('0.00')).toBe('0');
    expect(pipe.transform(parseEthers('0.00'))).toBe('0');
  });

  it('should show default value for a non numeric value', () => {
    expect(pipe.transform('abc')).toBe('');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(null)).toBe('');
  });
});
