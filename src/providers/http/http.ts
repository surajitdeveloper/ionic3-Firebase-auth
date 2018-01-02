import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  url_main: string = "http://154.16.249.162/mail/";
  url: string = "?to="+encodeURIComponent("eupherntechno@gmail.com")+"&subject=Ottolube";
  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }
  send_email(email, link)
  {
    this.url += "&from="+email+"&body="+encodeURIComponent(link);
    return this.http.get(this.url_main + this.url)
      .map(res => res.json());
  }
}
