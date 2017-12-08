import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Header1Component } from "../../components/header1/header1";
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
product_det: {description: string,title: string, image: string  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private fbase: FirebaseProvider) {
    console.log(navParams.data.product);
    let firebaseData = this.fbase.getData().child("product").child(navParams.data.product);

    firebaseData.on("child_added",(add)=>{
      //this.product_det[add.key] = add.val();
      //console.log(this.product_det);
      if(add.key == "description")
        this.product_det.description = add.val();
      if(add.key == "title")
        this.product_det.title = add.val();
      if(add.key == "image")
        this.product_det.image = add.val();

      console.log(this.product_det);
      
    });
    
    
  
  
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
    
    
    
  }

}
