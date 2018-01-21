import { Component } from '@angular/core';

/**
 * Generated class for the ReviewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reviews',
  templateUrl: 'reviews.html'
})
export class ReviewsComponent {

  text: string;

  constructor() {
    console.log('Hello ReviewsComponent Component');
    this.text = 'Hello World';
  }

}
