import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  url_main: string = "http://surajitdeveloper.in/projects/mail/mail_1.php"; //mail server
  url: string = "?to=surajitsadhukhan1@gmail.com";//info@ottolube.co.uk
  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }
  send_email(email, link, type)
  {
    //let data = {to: "eupherntechno@gmail.com", subject: "Ottolube New "+type, from: email, body: link};
    this.url += "&from=OttoLube<"+email+">&body="+encodeURIComponent(link)+"&subject="+type;// --- type parameter allocate to mail subject
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    /*return this.http.post(this.url_main, this.url, options)
      .map(res => res.json());*/
    return this.http.get(this.url_main + this.url)
      .map(res => res.json());
  }
}
