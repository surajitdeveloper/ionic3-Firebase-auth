import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { ListingPage } from "../../pages/listing/listing";
import { ProductDetailsPage } from "../product-details/product-details";
import { MyAccountPage } from "../../pages/my-account/my-account";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ext_put_data = [];
  goto(val)
  {
    this.navCtrl.push(ProductDetailsPage,{product: val});
  }
  
  constructor(public navCtrl: NavController, 
    private firebase: FirebaseProvider) {

    let catagoty_child = this.firebase.getData().child("product");
    let put_data = [];
    catagoty_child.on("child_added", function(snap)
      {
        let snap_val = snap.val();
        snap_val.parent = snap.key;
        put_data.push(snap_val);
      });
      this.ext_put_data = put_data;
  }

}
      