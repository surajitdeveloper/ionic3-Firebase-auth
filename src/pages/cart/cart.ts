import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { MethodsProvider } from "../../providers/methods/methods";
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { HttpProvider } from "../../providers/http/http";
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage { 
  cart_items = [];
  product_price: number = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private methods: MethodsProvider,
              private fbase: FirebaseProvider,
              private http: HttpProvider) { }
  SetQty(type, product_id, index, qty) // change quettiti in cart page
  {
    let curr_qty = qty;
    if(type == "minus")
      (curr_qty > 0)?curr_qty--:0;
    if(type == "plus")
      curr_qty++;
    let unit_price = this.cart_items[index].unit_price;
    this.cart_items[index].qty = curr_qty;
    this.cart_items[index].price = unit_price * curr_qty;
    let total_price = 0;
    for(let i=0; i < this.cart_items.length; i++) 
    {
      total_price = total_price + this.cart_items[i].price;
    }
    this.product_price = total_price;
    this.methods.get_cart().then((val) => 
    {
      let cart_items = this.methods.cart_json(val);
      cart_items[product_id].qty = curr_qty;
      cart_items[product_id].total_price = (qty * unit_price);
      let new_cart_item = JSON.stringify(cart_items);
      this.methods.set_storage('cart',"");
      new_cart_item = new_cart_item.substr(1);
      new_cart_item = new_cart_item.slice(0, -1);
      this.methods.set_storage('cart',new_cart_item);
    });
  }
  setQtyMinus(product_id, index, qty)
  {
    this.SetQty("minus", product_id, index, qty);
  }
  setQtyPlus(product_id, index, qty)
  {
    this.SetQty("plus", product_id, index, qty);
  }
  cross(product_id, index)
  {
    this.product_price = this.product_price - this.cart_items[index].price;
    this.cart_items.splice(index, 1);
    this.methods.get_cart().then((val) => 
    {
      let cart_items_json = this.methods.cart_json(val);
      console.log(cart_items_json);
      cart_items_json[product_id] = undefined
      cart_items_json = JSON.parse(JSON.stringify(cart_items_json));
      let new_cart_item = JSON.stringify(cart_items_json);
      this.methods.set_storage('cart',"");
      new_cart_item = new_cart_item.substr(1);
      new_cart_item = new_cart_item.slice(0, -1);
      this.methods.set_storage('cart',new_cart_item);
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.product_price = 0;
    this.methods.get_cart().then((val) => 
    {
      if(typeof val != "object" && val != "")
      {
        let cart_items = this.methods.cart_json(val);
        console.log(cart_items);
        let firebaseData = this.fbase.getData().child("product");
        for (var key in cart_items) {
          //console.log(key + " -> "); console.log(cart_items[key]);
            let product_obj = cart_items[key];
            this.product_price = this.product_price + product_obj.total_price;
            firebaseData.on("child_added",(add)=>{
              if(add.key == key)
              {
                let current_product = add.val();
                let product_img = "";
                let product_size = 0;
                if(product_obj.size == "size1")
                {
                  product_img = current_product.size.size1.image;
                  product_size = current_product.size.size1.size;
                }
                if(product_obj.size == "size2")
                {
                  product_img = current_product.size.size2.image;
                  product_size = current_product.size.size2.size;
                }
                if(product_obj.size == "size3")
                {
                  product_img = current_product.size.size3.image;
                  product_size = current_product.size.size3.size;
                }
                let cart_json = {title: current_product.title, qty: product_obj.qty, price: product_obj.total_price, 
                  product_size: product_size, unit_price: product_obj.item_price, product_id: key, product_img: product_img};
                this.cart_items.push(cart_json);
                console.log(this.cart_items);
              }
            });
        }
      }
      else
      {
        //alert("No product added to cart yet");
      }
    });
  }
  sendOrder()
  {
    let name ="";
    let email ="";
    this.methods.get_user().then((user_id)=>
    {
      if(typeof user_id != "object" && user_id != "")
      {
        if(user_id != "")
        {
          let userdata = this.fbase.getData().child("users");
          userdata.on("child_added", (snap)=>
          {
            if(snap.key == user_id)
            {
              let user_data = snap.val();
              if(user_data.type == "private_user")
              {
                name = user_data.firstname + " " + user_data.lastname;
                email = user_data.email;
              }
              if(user_data.type == "wholeseller")
                {
                  name = user_data.wholesellername;
                  email = user_data.email;
                }
              if(user_data.type == "trader")
                {
                  name = user_data.tradername;
                  email = user_data.email;
                }
                this.methods.get_cart().then((val) => 
                {
                  if(typeof val != "object" && val != "")
                  {
                    let output_html = "<html>";
                    output_html += "<head><title>New Product Order</title></head><body><table>";
                    output_html += "<p>Hi Admin,</p>";
                    output_html += "<p>A User requested for a Order </p>";
                    output_html += "<p>User Role:  "+user_data.type+"</p>";
                    output_html += "<p>Name:  "+name+"</p>";
                    output_html += "<p>Email:  "+email+"</p>"; 
                    output_html += "<p>Order Details  </p>";
                    output_html += "<tr><td>Title</td><td>Qty</td><td>Price</td></tr>";
                    let cart_items = this.methods.cart_json(val);
                    console.log(cart_items);
                    let firebaseData = this.fbase.getData().child("product");
                    for (var key in cart_items) 
                    {
                      let product_obj = cart_items[key];
                      firebaseData.on("child_added",(add)=>{
                        if(add.key == key)
                        {
                          let current_product = add.val();
                          let product_size = 0;
                          if(product_obj.size == "size1")
                          {
                            product_size = current_product.size.size1.size;
                          }
                          if(product_obj.size == "size2")
                          {
                            product_size = current_product.size.size2.size;
                          }
                          if(product_obj.size == "size3")
                          {
                            product_size = current_product.size.size3.size;
                          }
                          output_html += "<tr><td>"+current_product.title+"</td><td>"+product_obj.qty+"</td><td> £"+product_obj.total_price+"</td></tr>";
                        }
                      });
                    }
                    output_html += "<br />Total Amount - £"+this.product_price+"</table></body></html>";
                    //console.log(output_html);
                    this.methods.get_usermail().then((email) =>
                    {
                      //console.log(output_html);
                      console.log(email);
                      let current_data = new Date().toISOString();
                      let set_date = current_data.split(".");
                      let order_id = (Math.floor(Math.random() * 29) + 895632659)+ "-"+ set_date[0];
                      let order = this.fbase.getData().child("order").child(user_id).child(order_id).set(cart_items);
                      this.http.send_email(email, output_html,'New Order Request Email').subscribe( user => {}, error =>{} );
                      alert("Order Placed Successfully");
                      this.cart_items = [];
                      this.methods.set_storage("cart","");
                      this.product_price = 0;
                    }); 
                  }
                  else
                  {
                    alert("No product added to cart yet");
                  }
                });
              }
            });
          }
          //alert("checkout process");
      }
      else
      {
        alert("please login to checkout");
        this.navCtrl.push(LoginPage);
      }
    });
  }
}
