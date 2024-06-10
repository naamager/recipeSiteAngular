import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  template: `
    <span [class.filled]="filled">★</span>
  `,
  styles: [`
    span {
      font-size: 24px;
      color: #d3d3d3;
    }
    .filled {
      color: #ffca28;
    }
  `]
})
export class StarComponent {
  @Input() filled = false;
}
