import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { MyAccountPage } from "../../pages/my-account/my-account";
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
    this.product_price = this.product.size[val].price;
    this.image = this.product.size[val].image;
  }
  productAddtoCart(product_id, size, qty, item_price) // this method used for add product to cart and parameter used for product id, product size, product quantity and product item price
  {
    this.methods.get_cart().then((val) => 
    {
      if(typeof val != "object" && val != "")
      {
        console.log(val);
        let cart_item = "";
        let old_data_new = this.methods.cart_json(val);
        if(typeof old_data_new[product_id] != "object")
        {
          let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
          cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
          this.methods.set_storage("cart",val+","+cart_item);
        }
        else
        {
          alert("This Product already added in cart");
        }
      }
      else
      {
        let json_cart_data = {size: size, qty: qty, item_price: item_price, total_price: (qty * item_price)};
        let cart_item = '"'+product_id+'":'+JSON.stringify(json_cart_data);
        this.methods.set_storage("cart",cart_item);
        //console.log(cart_item);
      }
    });
  }
  add_cart() // this method is used for add cart button click function for product details page
  {
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