import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the MethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MethodsProvider {

  constructor(
    private storage: Storage
  ) {
    console.log('Hello MethodsProvider Provider');
  }
  public get_user()
  {
    return new Promise((resolve, reject) => {
      this.storage.get('uid').then((value) => {
          resolve(value);
      });
    });
  }
  public get_usermail()
  {
    return new Promise((resolve, reject) => {
      this.storage.get('useremail').then((value) => {
          resolve(value);
      });
    });
  }
  public get_cart()
  {
    return new Promise((resolve, reject) => {
      this.storage.get('cart').then((value) => {
          resolve(value);
      });
    });
  }
  public cart_json(cart)
  {
    let old_data = "{"+cart+"}";
    return JSON.parse(old_data);
  }
  public set_storage(key, val)
  {
    this.storage.set(key, val);
  }
  public clear_storage()
  {
    this.storage.clear();
  }
}
