import { Pipe, PipeTransform } from '@angular/core';
import BNJS from 'bignumber.js';
import { BigNumber } from 'ethers';
import { ethersOf, truncate } from '../uitils/bignumber-utils';

@Pipe({ name: 'truncate' })
export class BalanceTruncatePipe implements PipeTransform {
  constructor() {
    BNJS.config({ EXPONENTIAL_AT: 100 });
  }

  transform(
    value: number | string | BigNumber,
    nullvalue: string = '',
    decimals: number = 8
  ): string {
    try {
      if (value !== undefined) {
        const truncateValue = truncate(this.toString(value), decimals);

        if (Number(truncateValue) === 0) {
          return '0';
        } else {
          return truncateValue;
        }
      }
    } catch (e) {
      return nullvalue;
    }

    return nullvalue;
  }

  private toString(value: number | string | BigNumber) {
    if (typeof value === 'number' || typeof value === 'string') {
      return new BNJS(value).toString();
    } else {
      return new BNJS(ethersOf(value)).toString();
    }
  }
}
