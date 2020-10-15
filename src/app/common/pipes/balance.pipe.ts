import { Pipe, PipeTransform } from '@angular/core';

var bignumberJs = require('bignumber.js');
@Pipe({ name: '_balance' })
export class BalancePipe implements PipeTransform {
  constructor() {
    bignumberJs.config({ EXPONENTIAL_AT: 100 });
  }
  transform(value: any, nullvalue: string = ''): string {
    if (value) {
      const bignumber = new bignumberJs(value);
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
