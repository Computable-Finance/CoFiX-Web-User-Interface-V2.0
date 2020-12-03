import { WalletAddressPipe } from './wallet-address.pipe';

describe('WalletAddressPipe', () => {
  const pipe = new WalletAddressPipe();

  it('should transform an empty address to --', () => {
    expect(pipe.transform(undefined)).toBe('--');
    expect(pipe.transform(null)).toBe('--');
    expect(pipe.transform('')).toBe('--');
  });

  it('should transform an address to a string like "0xyyyy...yyyy"', () => {
    expect(pipe.transform('0x16f1CdF5200d7ae7r08c1522f19052A722D93971')).toBe(
      '0x16f1...3971'
    );
    expect(pipe.transform('16f1CdF5200d7ae7r08c1522f19052A722D93971')).toBe(
      '0x16f1...3971'
    );
  });
});
