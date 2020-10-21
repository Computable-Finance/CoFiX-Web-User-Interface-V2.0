import { BalancePipe } from './balance.pipe';

describe('BalancePipe', () => {
  const pipe = new BalancePipe();

  it('should truncate a number to precision 8 without rounding', () => {
    expect(pipe.transform(1.234567891)).toBe('1.23456789');
    expect(pipe.transform(1.23456789)).toBe('1.23456789');
    expect(pipe.transform(1.234567899)).toBe('1.23456789');
  });

  it('should not truncate a number without precision 8', () => {
    expect(pipe.transform(1.234)).toBe('1.234');
  });

  it('should not truncate a int', () => {
    expect(pipe.transform(123456789)).toBe('123456789');
  });

  it('should show 0 for 0.000000000', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(0.0)).toBe('0');
    expect(pipe.transform('0.00')).toBe('0');
  });
});
