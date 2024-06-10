import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HelpersService {
  constructor(private http: HttpClient){}
  sayHello( ) {
    console.log('HELLO :D');

  }
}
