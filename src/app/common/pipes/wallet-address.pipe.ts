import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'walletaddress' })
export class WalletAddressPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      if (value.indexOf('0x') > -1) {
        return `${value.slice(0, 6)}...${value.slice(-4)}`;
      } else {
        return `0x${value.slice(0, 4)}...${value.slice(-4)}`;
      }
    }
    return '--';
  }
}
