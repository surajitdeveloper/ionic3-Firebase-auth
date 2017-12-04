import { Component } from '@angular/core';

/**
 * Generated class for the Header1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header1',
  templateUrl: 'header1.html'
})
export class Header1Component {

  text: string;

  constructor() {
    console.log('Hello Header1Component Component');
    this.text = 'Hello World';
  }

}
