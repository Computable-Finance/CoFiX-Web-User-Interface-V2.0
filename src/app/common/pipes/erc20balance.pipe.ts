import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

var bignumberJs = require('bignumber.js');
@Pipe({ name: 'erc20balance' })
export class ERC20BalancePipe implements PipeTransform {
  constructor() {
    bignumberJs.config({ EXPONENTIAL_AT: 100 });
  }
  transform(value: any, nullvalue: string = ''): string {
    if (value) {
      const val = ethers.utils.formatEther(value);
      const bignumber = new bignumberJs(val);
      const truncateValue = this.truncate(bignumber.toString(), 8);
      if (Number(truncateValue) === 0) {
        return '0';
      } else {
        return truncateValue;
      }
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
