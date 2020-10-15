import { Pipe, PipeTransform } from '@angular/core';

var bignumberJs = require('bignumber.js');
@Pipe({ name: '_truncate' })
export class TruncatePipe implements PipeTransform {
  constructor() {
    bignumberJs.config({ EXPONENTIAL_AT: 100 });
  }
  transform(value: any, nullvalue: string = ''): string {
    if (value === '--') {
      return value;
    } else {
      if (Number(value) === 0) {
        return '0';
      } else {
        return new bignumberJs(value)
          .toString()
          .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
      }
    }
  }
}
