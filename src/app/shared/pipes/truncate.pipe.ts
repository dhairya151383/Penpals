import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, limit: number = 150): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
