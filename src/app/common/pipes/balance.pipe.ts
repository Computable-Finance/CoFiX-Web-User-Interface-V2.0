import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '_balance' })
export class BalancePipe implements PipeTransform {
  transform(value: any, nullvalue: string = ''): string {
    if (value) {
      return this.truncate(value.toString(), 8);
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
