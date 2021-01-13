import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'walletaddress' })
export class WalletAddressPipe implements PipeTransform {
  transform(value: string, length: number = 4): string {
    if (value) {
      if (value.indexOf('0x') > -1) {
        return `${value.slice(0, length + 2)}...${value.slice(-1 * length)}`;
      } else {
        return `0x${value.slice(0, length)}...${value.slice(-1 * length)}`;
      }
    }
    return '--';
  }
}
