import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { MyAccountPage } from "../../pages/my-account/my-account";
import { Storage } from '@ionic/storage';
import { CartPage } from "../../pages/cart/cart";
import { MethodsProvider } from "../../providers/methods/methods";
//import { from } from 'rxjs/observable/from';
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
  product: any; //this variable store product data from firebase
  total_qty: number = 1; // product quantity
  size: string = "size1";
  product_price: number = 0;
  image: string = ""; //this variable is used for product image base 64 string
  product_id: string;
  reviews: boolean = true;
  specification: boolean = false;
  technicaldetails: boolean = false;
  button_disable: boolean = false;
  public technicalSpec: any;
  public review: any;
  public spec: any;
  changeSpec(val)
  {
    if(val == "reviews")
    {
      this.reviews = true;
      this.specification = false;
      this.technicaldetails = false;
    }
    if(val == "specification")
    {
      this.reviews = false;
      this.specification = true;
      this.technicaldetails = false;
    }
    if(val == "technicaldetails")
    {
      this.reviews = false;
      this.specification = false;
      this.technicaldetails = true;
    }
  }
  set_liter(val) //this method is used for change liter tab in product details page
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
  productAddtoCart(product_id, size, qty, item_price) // this method used for add product to cart and parameter used for product id, product size, product quantity and product item price
  {
    this.storage.get('cart').then((val) => 
    {
      if(typeof val != "object" && val != "")
      {
        console.log(val);
        let cart_item = "";
        let old_data = "{"+val+"}";
        let old_data_new = JSON.parse(old_data);
        if(product_id == "product1")
        {
          if(typeof old_data_new.product1 != "object")
          {
            let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
            cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
            this.storage.set("cart",val+","+cart_item);
          }
          else
          {
            alert("This Product already added in cart");
          }
        }
        if(product_id == "product2")
        {
          if(typeof old_data_new.product2 != "object")
          {
            let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
            cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
            this.storage.set("cart",val+","+cart_item);
          }
          else
          {
            alert("This Product already added in cart");
          }
        }
        if(product_id == "product3")
        {
          if(typeof old_data_new.product3 != "object")
          {
            let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
            cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
            this.storage.set("cart",val+","+cart_item);
          }
          else
          {
            alert("This Product already added in cart");
          }
        }
        //let new_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price), product_id: product_id};
      }
      else
      {
        let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
        let cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
        this.storage.set("cart",cart_item);
        //console.log(cart_item);
      }
    });
  }
  add_cart() // this method is used for add cart button click function for product details page
  {
    //alert("Work on process");
    //alert(this.total_qty);
    //alert(this.product_price);
    //alert(this.size);
    console.log(this.product_id);
    console.log(this.size);
     this.productAddtoCart(this.product_id, this.size, this.total_qty, this.product_price);
     this.button_disable = true;
  }
  gotoCart() // This method is used to goto cart page
  {
    this.navCtrl.push(CartPage);
  }
  set_qty(type) // this method id used for plus minus function in product details page and type(parameter) is minus or plus
  {
    if(type == "minus")
      (this.total_qty > 0)?this.total_qty--:0;
    if(type == "plus")
      this.total_qty++;
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fbase: FirebaseProvider,
    private storage: Storage,
    private methods: MethodsProvider) {
    let product = navParams.data.product;
    let firebaseData = this.fbase.getData().child("product");
    firebaseData.on("child_added",(add)=>{
      if(add.key == product)
      {
        this.product_id = product;
        this.product = add.val();
        this.product_price = this.product.size.size1.price;
        this.image = this.product.size.size1.image;
        this.technicalSpec = this.product.technical_details;
        this.spec = this.product.specification;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage'); 
  }
}