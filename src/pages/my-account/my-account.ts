import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Storage } from '@ionic/storage';
import { HomePage } from "../../pages/home/home";
import { MyOrderPage } from "../../pages/my-order/my-order";
/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
}) 
export class MyAccountPage {
  name: string = "";
  constructor(public navCtrl: NavController,
    private fbase: FirebaseProvider,
    private storage: Storage) {

      this.storage.get('uid').then((val) => {
        let user_id = val;
        if(user_id != "")
        {
          let userdata = this.fbase.getData().child("users");
          userdata.on("child_added", (snap)=>
          {
            if(snap.key == user_id)
            {
              let user_data = snap.val();
              if(user_data.type == "private_user")
                this.name = user_data.firstname + " " + user_data.lastname;
              if(user_data.type == "wholeseller")
                this.name = user_data.wholesellername
              if(user_data.type == "trader")
                this.name = user_data.tradername;
            }
          });
        }
        else
        {
          this.navCtrl.setRoot(HomePage);
        }
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
    //let firebaseData = this.fbase.getData().child("user");
  }
  logout()
  {
    this.storage.set('uid', '');
    this.navCtrl.setRoot(HomePage);
  }
  order(){
    this.navCtrl.setRoot(MyOrderPage);
  }
}
