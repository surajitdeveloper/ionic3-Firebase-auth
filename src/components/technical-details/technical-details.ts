import { Component } from '@angular/core';
import { ProductDetailsPage } from "../../pages/product-details/product-details";
/**
 * Generated class for the TechnicalDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'technical-details',
  templateUrl: 'technical-details.html'
})
export class TechnicalDetailsComponent {

  text: string;
  setspec = [];
  constructor(private productDet: ProductDetailsPage) {
    console.log('Hello TechnicalDetailsComponent Component');
    console.log(productDet.technicalSpec);
    let techspec = productDet.technicalSpec;
    for (var key in techspec) {
      //console.log(key + " -> " + cart_items[key]);
      let product_obj = techspec[key];
      this.setspec.push({key: key, value: product_obj});
    }
    //console.log(this.setspec);
  }

}
