import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

@Pipe({ name: 'erc20balance' })
export class ERC20BalancePipe implements PipeTransform {
  transform(value: any, nullvalue: string = ''): string {
    if (value) {
      return this.truncate(ethers.utils.formatEther(value), 8);
    }
    return nullvalue;
  }
  truncate(val, precision) {
    const dotIndex = val.indexOf('.');
    if (dotIndex === -1) {
      return val;
    } else {
      return val.slice(0, dotIndex + precision + 1);
    }
  }
}
