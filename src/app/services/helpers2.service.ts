import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Helpers2Service {
  constructor(private http: HttpClient){}
  sayHello( ) {
    console.log('HELLO From Helper2 :D');

  }
}
