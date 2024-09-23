import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/app.component';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient: HttpClient) { }
 // crypto.SHA512(credentials.password
  logIn(credentials: { email: string; password: string, keepLoggedIn:boolean }):Observable<any>{
    return this._httpClient.post<any>("http://10.68.1.100:3000/api/v1/auth/login", {
      "username":credentials.email,
      "password":crypto.SHA512(credentials.password).toString(),
      "keepSessionOpen":credentials.keepLoggedIn
    })
  }

  logOut(){
    environment.loggedIn=false;
    environment.username = '';
    environment.name = '';
    environment.lastName = '';
    environment.profilePicture = '';
    return true;
  }

  getProfile():Observable<any>{
    return this._httpClient.get<any>("http://10.68.1.100:3000/api/v1/users/profile")
  }

}
