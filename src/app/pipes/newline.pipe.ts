import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline',
  standalone: true
})
export class NewlinePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    const lines = value.split('\n');
    const listItems = lines.map(line => `<li>${line.trim()}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }

}
