import { Injectable } from '@angular/core';
import { environment } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(credentials: { email: any; password: any }): boolean {
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
