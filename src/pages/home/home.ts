import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Header1Component } from "../../components/header1/header1";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
