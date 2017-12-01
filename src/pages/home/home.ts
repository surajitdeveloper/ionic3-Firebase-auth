import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { FirebaseApp } from 'angularfire2/firebase.app.module';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private firebase: FirebaseApp) {

  }

}
