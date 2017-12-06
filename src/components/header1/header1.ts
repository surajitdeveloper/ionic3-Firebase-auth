import { Component } from '@angular/core';
import { HomePage } from "../../pages/home/home";
import { ListingPage } from "../../pages/listing/listing";
import { ProductDetailsPage } from "../../pages/product-details/product-details";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 public goto(page){
   
 }
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello Header1Component Component');
    
  }

}
