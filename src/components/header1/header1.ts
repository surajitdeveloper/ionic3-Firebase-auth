import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyAccountPage } from "../../pages/my-account/my-account";
import { LoginPage } from "../../pages/login/login";
import { CartPage } from "../../pages/cart/cart";
import { HomePage } from "../../pages/home/home";
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the Header1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header1',
  templateUrl: 'header1.html'
})
export class Header1Component {
  goto(val)
  {
    switch(val)
    {
      case 'profile':
        this.callNumber.callNumber("+44 (0) 02034090835", true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
        break;
      case 'cart':
        this.navCtrl.push(CartPage);
        break;
      case 'home':
        this.navCtrl.setRoot(HomePage);
        break;
    }
  }
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private callNumber: CallNumber) 
    {
      console.log('Hello Header1Component Component');
    }
}
