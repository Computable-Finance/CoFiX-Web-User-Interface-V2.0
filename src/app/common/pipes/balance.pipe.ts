import { Pipe, PipeTransform } from '@angular/core';
import { truncate } from '../uitils/bignumber-utils';

const bignumberJs = require('bignumber.js');

@Pipe({ name: '_balance' })
export class BalancePipe implements PipeTransform {
  constructor() {
    bignumberJs.config({ EXPONENTIAL_AT: 100 });
  }

  transform(value: any, nullvalue: string = ''): string {
    try {
      if (value !== undefined) {
        const bignumber = new bignumberJs(value);
        const truncateValue = truncate(bignumber.toString(), 8);

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
}
