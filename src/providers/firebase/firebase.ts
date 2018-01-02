//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  //public http: HttpClient,
  constructor(private firebase: AngularFireDatabase,
  private fieauth : AngularFireAuth) {
    console.log('Hello FirebaseProvider Provider');
  }
  getData()
  {
    return this.firebase.database.ref();
  }
  firebaseauth()
  {
    return this.fieauth.auth;
  }
}
