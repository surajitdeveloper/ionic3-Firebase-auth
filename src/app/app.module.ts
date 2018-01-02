import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListingPage } from "../pages/listing/listing";
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { LoginPage } from "../pages/login/login";
import { RegistrationPage } from "../pages/registration/registration";
import { MyAccountPage } from "../pages/my-account/my-account";
import { CartPage } from "../pages/cart/cart";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpModule } from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Header1Component } from "../components/header1/header1";
import { HttpProvider } from '../providers/http/http';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
export const firebaseConfig = {
  apiKey: "AIzaSyBI-fuK3RUJfAb6DWidxB6D-TCOiTHuBmU",
  authDomain: "ottolube-893d9.firebaseapp.com",
  databaseURL: "https://ottolube-893d9.firebaseio.com",
  projectId: "ottolube-893d9",
  storageBucket: "ottolube-893d9.appspot.com",
  messagingSenderId: "586868854885"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Header1Component,
    ListingPage,
    ProductDetailsPage,
    LoginPage,
    RegistrationPage,
    MyAccountPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Header1Component,
    ListingPage,
    ProductDetailsPage,
    LoginPage,
    RegistrationPage,
    MyAccountPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    HttpProvider,
    CallNumber
  ]
})
export class AppModule {}
