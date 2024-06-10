import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let result = '';
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      if (hours > 0) result += ' ו';
      result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return result;
  }

}
