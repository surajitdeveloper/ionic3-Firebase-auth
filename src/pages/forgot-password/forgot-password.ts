import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  error: string = "";
  success: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbase: FirebaseProvider) {
  }
  forgot(val)
  {
    if(val == "")
    {
      this.success = "";
      this.error = "Please Enter Emaill";
    }
    else
    {
      this.success = "";
      this.error = "";
      this.fbase.firebaseauth().sendPasswordResetEmail(val)
      .then(()=>
      {
        this.success = "Mail Send Successfully !!! please check email to reset your password";
      })
      .catch((error)=>
      {
        this.error = "An error occure to sending mail";
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
