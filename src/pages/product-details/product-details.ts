import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Header1Component } from "../../components/header1/header1";
/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
productDetails=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private fbase: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
    
  }

}
