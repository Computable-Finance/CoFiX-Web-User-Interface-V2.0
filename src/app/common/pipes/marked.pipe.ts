import { Pipe, PipeTransform } from '@angular/core';

import * as marked from 'marked';

@Pipe({
  name: 'marked',
})
export class MarkedPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return marked(value);
    }
    return '';
  }
}
