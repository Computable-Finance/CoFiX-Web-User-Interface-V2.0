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
    const x = Number(val);

    const x1 = x.toFixed(precision);
    const x2 = x.toFixed(precision + 1);

    if (x1 > x2) {
      return (Number(x1) - 1e-8).toFixed(precision);
    } else {
      if (Number(x1) === 0) {
        return '0';
      } else {
        return x1;
      }
    }
  }
}