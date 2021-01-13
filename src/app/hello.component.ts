import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<a [routerLink]="['/demo/home']">
  Back to home demo
</a> <h1>This is next page</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
