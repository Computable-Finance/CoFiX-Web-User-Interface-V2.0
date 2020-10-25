import { Pipe, PipeTransform } from '@angular/core';
import { BigNumber } from 'ethers';

import { ethersOf, truncate } from '../uitils/bignumber-utils';

const BNJS = require('bignumber.js');

@Pipe({ name: '_balance' })
export class BalancePipe implements PipeTransform {
  constructor() {
    BNJS.config({ EXPONENTIAL_AT: 100 });
  }

  transform(
    value: number | string | BigNumber,
    nullvalue: string = ''
  ): string {
    try {
      if (value !== undefined) {
        const truncateValue = truncate(this.toString(value), 8);

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
