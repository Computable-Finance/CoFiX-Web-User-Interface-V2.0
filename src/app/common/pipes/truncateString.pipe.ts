import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '_truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: any, nullvalue: string = ''): string {
    if (value) {
      if (Number(value) === 0) {
        return '0';
      } else {
        return value.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
      }
    }
    return '';
  }
}
