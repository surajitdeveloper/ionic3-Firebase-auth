import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider} from "../../providers/firebase/firebase";
import { CartPage } from "../../pages/cart/cart";

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {
  cart_items = [];
  gggggggggggggg: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage, 
    private fire: FirebaseProvider) {

      this.storage.get('cart').then((val1) => 
    {
      if(typeof val1 != "object" && val1 != "")
      {
        this.gggggggggggggg = true;
        let new_str = "{"+val1+"}";
        let cart_items = JSON.parse(new_str);
        console.log(cart_items);
        //let fire = this.fbase.getData().child("order");
        for (let key in cart_items) {
          let product_obj = cart_items[key];
          console.log(product_obj);
        }
      }
    })
    }
     /*  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  } */
  }  

