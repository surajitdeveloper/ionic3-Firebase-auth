import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { ProductDetailsPage } from "../product-details/product-details";
import { MyAccountPage } from "../../pages/my-account/my-account";

/**
 * Generated class for the ListinpgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
  productList= [];
  goto(page)
  {
    //this.header.goto(page);
    this.navCtrl.push(ProductDetailsPage,{product: page});
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    private fbase: FirebaseProvider){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
    let firebaseData = this.fbase.getData().child("product");
    let put_data = [];
    firebaseData.on("child_added", function(snap)
    {
      let snap_val = snap.val();
      snap_val.parent = snap.key;
      put_data.push(snap_val);
    });
    this.productList = put_data;
  }

}
      