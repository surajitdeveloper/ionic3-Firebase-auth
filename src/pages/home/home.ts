import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Header1Component } from "../../components/header1/header1";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ext_put_data = [];
  constructor(public navCtrl: NavController, private firebase: FirebaseProvider) {

    let catagoty_child = this.firebase.getData().child("product");
    let put_data = [];
    catagoty_child.on("child_added", function(snap)
      {
          put_data.push(snap.val());
      });
      this.ext_put_data = put_data;
      console.log(this.ext_put_data);
  }

}
