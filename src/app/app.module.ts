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
import { MyOrderPage } from "../pages/my-order/my-order";
import { CartPage } from "../pages/cart/cart";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpModule } from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Header1Component } from "../components/header1/header1";
import { ReviewsComponent } from "../components/reviews/reviews";
import { SpecificationComponent } from "../components/specification/specification";
import { TechnicalDetailsComponent } from "../components/technical-details/technical-details";
import { HttpProvider } from '../providers/http/http';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { from } from 'rxjs/observable/from';
import { MethodsProvider } from '../providers/methods/methods';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
export const firebaseConfig = {
  apiKey: "AIzaSyBYCiuNeQa5ZejfXO6tkuIeWB3Ehsq9PS0",
    authDomain: "ottolube-970b4.firebaseapp.com",
    databaseURL: "https://ottolube-970b4.firebaseio.com",
    projectId: "ottolube-970b4",
    storageBucket: "ottolube-970b4.appspot.com",
    messagingSenderId: "332971121563"
 };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Header1Component,
    TechnicalDetailsComponent,
    SpecificationComponent,
    ReviewsComponent,
    ListingPage,
    ProductDetailsPage,
    ForgotPasswordPage,
    LoginPage,
    RegistrationPage,
    MyAccountPage,
    CartPage,
    MyOrderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    TechnicalDetailsComponent,
    SpecificationComponent,
    ReviewsComponent,
    ListingPage,
    ProductDetailsPage,
    ForgotPasswordPage,
    LoginPage,
    RegistrationPage,
    MyAccountPage,
    CartPage,
    MyOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    HttpProvider,
    HttpModule,
    MethodsProvider,
    CallNumber,
    HttpClientModule,
    MethodsProvider
  ]
})
export class AppModule {}
