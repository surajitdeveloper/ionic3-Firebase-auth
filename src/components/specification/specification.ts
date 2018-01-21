import { Component } from '@angular/core';

/**
 * Generated class for the SpecificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'specification',
  templateUrl: 'specification.html'
})
export class SpecificationComponent {

  text: string;

  constructor() {
    console.log('Hello SpecificationComponent Component');
    this.text = 'Hello World';
  }

}
