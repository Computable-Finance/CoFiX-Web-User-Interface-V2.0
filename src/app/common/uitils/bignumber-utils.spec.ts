import { isValidNumberForTx, truncate } from './bignumber-utils';

describe('BigNumberUtils', () => {
  it('should truncate a numberic string to a specified precision', () => {
    expect(truncate('1', 8)).toBe('1');
    expect(truncate('11111111', 8)).toBe('11111111');
    expect(truncate('11111111111111', 8)).toBe('11111111111111');
    expect(truncate('0.00000000001', 8)).toBe('0.00000000');
    expect(truncate('0.00001', 8)).toBe('0.00001');
    expect(truncate('0.00000000001', 11)).toBe('0.00000000001');
    expect(truncate('-1', 8)).toBe('-1');
    expect(truncate('-11111111', 8)).toBe('-11111111');
    expect(truncate('-11111111111111', 8)).toBe('-11111111111111');
    expect(truncate('-0.00000000001', 8)).toBe('-0.00000000');
    expect(truncate('-0.00001', 8)).toBe('-0.00001');
    expect(truncate('-0.00000000001', 11)).toBe('-0.00000000001');
  });

  it('should truncate a numberic string without rounding', () => {
    expect(truncate('0.55555', 8)).toBe('0.55555');
    expect(truncate('0.555555555555555', 8)).toBe('0.55555555');
    expect(truncate('0.555555545555555', 8)).toBe('0.55555554');
    expect(truncate('555555555555555', 8)).toBe('555555555555555');
  });

  it('should throw an error when truncating non numberic string', () => {
    ['wss', '1234.', 'a.1234', '123.abc', '-1.'].forEach((value) => {
      expect(() => truncate(value, 8)).toThrow();
    });
  });

  it('should know if a number is valid for eth tx', () => {
    [
      'wss',
      'a.1234',
      '123.abc',
      '-1.',
      undefined,
      '',
      '    ',
      null,
      -1,
      0,
    ].forEach((value) => {
      expect(isValidNumberForTx(value)).toBe(false);
    });

    [
      0.0000000000000000000000001,
      0.001,
      0.1,
      1,
      10,
      100,
      1000,
      10.00001,
    ].forEach((value) => {
      expect(isValidNumberForTx(value)).toBe(true);
    });
  });
});
