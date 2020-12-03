import { MarkedPipe } from './marked.pipe';

describe('MarkedPipe', () => {
  const pipe = new MarkedPipe();

  it('should show empty string for undefined / null / empty string.', () => {
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should work for non empty string.', () => {
    expect(pipe.transform('this is a test')).not.toEqual('');
  });
});
