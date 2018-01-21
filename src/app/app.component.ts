import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListingPage } from "../pages/listing/listing";
import { LoginPage } from "../pages/login/login";
import { RegistrationPage } from "../pages/registration/registration";
import { MyAccountPage } from "../pages/my-account/my-account";
import { MyOrderPage } from "../pages/my-order/my-order";
//import { from } from 'rxjs/observable/from';
import { MethodsProvider } from "../providers/methods/methods";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  islogin: boolean = false;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, public splashScreen: SplashScreen,
     private methods: MethodsProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    setInterval(()=>
    {
      this.methods.get_user().then((user)=>
    {
      if(typeof user != "object" && user != "")
      {
        this.islogin = true;
      }
    });
    }, 2000);
    setInterval(()=>
    {
      //console.log(this.islogin);
      if(!this.islogin)
    {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: "Product Listing", component: ListingPage },
        { title: "Login", component: LoginPage },
        { title: "Registration", component: RegistrationPage }
      ];
    }
    else
    {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: "Product Listing", component: ListingPage },
        { title: "My Account", component: MyAccountPage },
        { title: "Logout", component: "" }
      ];
    }
    }, 1000);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (page.title) {
      case "Logout":
        this.methods.clear_storage();
        this.nav.setRoot(HomePage);
        this.islogin = false;
        break;
    
      default:
      this.nav.setRoot(page.component);
        break;
    }
  }
}
