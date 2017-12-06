import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Header1Component } from "../../components/header1/header1";
import { ListingPage } from "../../pages/listing/listing";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ext_put_data = [];
  goto(val)
  {
    alert(val);
  }
  constructor(public navCtrl: NavController, private firebase: FirebaseProvider) {

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
