import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider} from "../../providers/firebase/firebase";
import { CartPage } from "../../pages/cart/cart";
import { MethodsProvider } from "../../providers/methods/methods";
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
  cart_element: any;
  gggggggggggggg: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: FirebaseProvider,
    private methods: MethodsProvider) {
    }
     ionViewDidLoad() {
      this.methods.get_user().then((user_id)=>
      {
        if(typeof user_id != "object" && user_id != "")
        {
          let firebase = this.fire.getData().child("order").child(user_id);
          firebase.on("child_added", (snap)=>
          {
            let order_key = snap.key;
            let order_items = snap.val();
              let order_date = order_key.split("T");
              let order_date1 = order_date[0];
              let oder_dt_part = order_date1.split("-");
              let full_order_date = oder_dt_part[3]+"-"+oder_dt_part[2]+"-"+oder_dt_part[1];
              this.gggggggggggggg = true;
              //this.cart_element.date = full_order_date;
              //console.log(full_order_date);
              //order_data.title = order_date[0];
              for(let product_id in order_items)
              {
                let size = order_items[product_id].size;
                //console.log(product_id); console.log(size);
                let fireorder = this.fire.getData().child("product");
                fireorder.on("child_added", (snaporder)=>
                {
                  if(snaporder.key == product_id)
                  {
                    let product_det = snaporder.val();
                    let order_obj = {date: full_order_date, img: product_det.size[size].image, title: product_det.title, qty: order_items[product_id].qty, price: order_items[product_id].total_price, size: size};
                    this.cart_items.push(order_obj);
                  }
                });
              }
          });
          console.log(this.cart_items);
        }
      });
    console.log('ionViewDidLoad MyOrderPage');
  } 
  }  

