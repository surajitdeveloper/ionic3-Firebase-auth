import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from "../../pages/home/home";
import { MyAccountPage } from "../../pages/my-account/my-account";
import { MethodsProvider } from "../../providers/methods/methods";
import { RegistrationPage } from "../../pages/registration/registration";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
//import { MyApp } from "../../app/app.component";
import { from } from 'rxjs/observable/from';
import { ListingPage } from "../listing/listing";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage { 
  private todo : FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private firebase: FirebaseProvider,
    private methods: MethodsProvider) {
      this.todo = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }
  goto(val)
  {
    if(val == "register")
      this.navCtrl.push(RegistrationPage);
    if(val == "forgot")
      this.navCtrl.push(ForgotPasswordPage);
  }
  private_user: boolean = false;
  wholeseller: boolean = false;
  trader: boolean = false;
  logedin(){
    this.firebase.firebaseauth().signInWithEmailAndPassword(this.todo.value.email, this.todo.value.password)
    .then((user)=>
    {
      let user_email = user.email;
      let user_id = user.uid;
      console.log(user);
      let userdata = this.firebase.getData().child("users");
      userdata.on("child_added", (snap)=>
      {
        if(snap.key == user_id)
        {
          let user_data = snap.val();
          if(typeof user_data.not_activated == "undefined")
          {
            this.methods.set_storage("uid",user_id);
            this.methods.set_storage("useremail",this.todo.value.email);
            this.navCtrl.setRoot(MyAccountPage);
          }
          else
          {
            alert("user not activated");
          }
        }
      });
    })
    .catch((error)=>
    {
        console.log(error);
        alert("Error- "+error.message);
    });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}  
   