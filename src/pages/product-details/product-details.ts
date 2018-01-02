import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { MyAccountPage } from "../../pages/my-account/my-account";
import { Storage } from '@ionic/storage';
import { CartPage } from "../../pages/cart/cart";
/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  total_qty: number = 1;
  size: string = "size1";
  product_price: number = 0;
  image: string = "";
  cart_str: string;
  product_id: string;
  set_liter(val)
  {
    this.size = val;
    switch(val)
    {
      case "size1":
        this.product_price = this.product.size.size1.price;
        this.image = this.product.size.size1.image;
        break;
      case "size2":
        this.product_price = this.product.size.size2.price;
        this.image = this.product.size.size2.image;
        break;
      case "size3":
        this.product_price = this.product.size.size3.price;
        this.image = this.product.size.size3.image;
        break;
    }
  }
  add_cart()
  {
    //alert("Work on process");
    //alert(this.total_qty);
    //alert(this.product_price);
    //alert(this.size);
    this.storage.get('cart').then((val) => 
    {
      let user_id = val;
      if(user_id != "")
      {
        //alert("Your Total is - "+ (this.total_qty * this.product_price));
        let old_cart = JSON.parse(user_id);
        this.storage.set("cart","");
        old_cart[this.product_id] = {size: this.size, qty: this.total_qty, item_price: this.product_price, total_price: (this.total_qty * this.product_price)};
        this.storage.set("cart",JSON.stringify(old_cart));
      }
      else
      {
        let old_cart = [];
        old_cart[this.product_id] = {size: this.size, qty: this.total_qty, item_price: this.product_price, total_price: (this.total_qty * this.product_price)};
        this.storage.set("cart",JSON.stringify(old_cart));
      }
    },
    (error)=>
    {
      let old_cart = [];
      old_cart[this.product_id] = {size: this.size, qty: this.total_qty, item_price: this.product_price, total_price: (this.total_qty * this.product_price)};
      this.storage.set("cart",JSON.stringify(old_cart));
    }); 

  }
  set_qty(type)
  {
    if(type == "minus")
      (this.total_qty > 0)?this.total_qty--:0;
    if(type == "plus")
      this.total_qty++;
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fbase: FirebaseProvider,
    private storage: Storage) {
    let product = navParams.data.product;
    let firebaseData = this.fbase.getData().child("product");
    firebaseData.on("child_added",(add)=>{
      if(add.key == product)
      {
        this.product_id = product;
        this.product = add.val();
        this.product_price = this.product.size.size1.price;
        this.image = this.product.size.size1.image;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage'); 
  }
}
 