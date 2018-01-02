import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from "../login/login";
import { MyAccountPage } from "../../pages/my-account/my-account";
import { HttpProvider } from "../../providers/http/http";
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  private todo : FormGroup;
  /* goto(login){
    this.navCtrl.push(LoginPage,{users: login});
 } */
 // showPassword = "password";
  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private firebase: FirebaseProvider,
    private http: HttpProvider
  ) {
     this.todo = this.formBuilder.group({
          regtype: ['', Validators.required],
          firstname: [''],
          lastname: [''],
          wholesellername: [''],
          tradername: [''],
          companyname: [''],
          companyaddress: [''],
          companyregisternumber: [''],
          email: ['', Validators.required],
          password: ['', Validators.required],
        });
  }
  private_user: boolean = false;
  wholeseller: boolean = false;
  trader: boolean = false;
  logForm()
  {
    this.firebase.firebaseauth()
    .createUserWithEmailAndPassword(this.todo.value.email, this.todo.value.password)
    .then((user)=>
    {
      let user_email = user.email;
      let user_id = user.uid;
      let user_data = {};
      let user_type = this.todo.value.regtype;
      if(user_type == "private_user")
        user_data = {type: user_type, firstname: this.todo.value.firstname, lastname: this.todo.value.lastname, email: user_email, not_activated: true};
      if(user_type == "wholeseller")
        user_data = {type: user_type, wholesellername: this.todo.value.wholesellername, companyname: this.todo.value.companyname, companyaddress: this.todo.value.companyaddress, companyregisternumber: this.todo.value.companyregisternumber, email: user_email,  not_activated: true};
      if(user_type == "trader")
        user_data = {type: user_type, tradername: this.todo.value.tradername, companyname: this.todo.value.companyname, companyaddress: this.todo.value.companyaddress, companyregisternumber: this.todo.value.companyregisternumber, email: user_email,  notactivated: true};
      let userinput = this.firebase.getData().child("users").child(user_id).set(user_data);
      let user_link = "https://ottolube-893d9.firebaseio.com/users/"+ user_id;
      //alert (user_link);
      this.http.send_email(user_email, user_link).subscribe( user => {}, error =>{} );
      this.todo.reset();
      alert("your account is under review, Please wait");
     this.navCtrl.push(LoginPage);
    })
    .catch((error)=>
    {
        console.log(error);
        alert("Error- "+error.message);
    });
  }
  changemembertype()
  {
    let user_type = this.todo.value.regtype;
    if(user_type == "private_user")
    {
        this.private_user = true;
        this.wholeseller = false;
        this.trader = false;
    } 
    else if(user_type == "wholeseller")
    {
      this.private_user = false;
      this.wholeseller = true;
      this.trader = false;
    }
    else if(user_type == "trader")
    {
      this.private_user = false;
      this.wholeseller = false;
      this.trader = true;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }
}
    