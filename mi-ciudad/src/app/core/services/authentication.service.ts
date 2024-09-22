import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/app/app.component';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient: HttpClient) { }
 // crypto.SHA512(credentials.password
  login(credentials: { email: any; password: any }): boolean {
    this._httpClient.post<Response>("http://localhost:3000/api/v1/auth/login", {"username":credentials.email, "password":crypto.SHA512(credentials.password).toString()})
    .subscribe(data => {
      console.log(data);
    });
    if(credentials.email=='test@dominio.com' && credentials.password == 'test'){
      environment.loggedIn=true;
      environment.username = credentials.email;
      environment.name = 'Test User';
      environment.lastName = 'Lastname';
      environment.profilePicture = 'image/url';
      return true;
    }else{
      return false;
    }
  }
  logOut(){
    environment.loggedIn=false;
    environment.username = '';
    environment.name = '';
    environment.lastName = '';
    environment.profilePicture = '';
    return true;
  }

}
