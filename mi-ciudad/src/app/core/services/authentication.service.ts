import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/app.component';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) {}
  // crypto.SHA512(credentials.password
  logIn(credentials: {
    email: string;
    password: string;
    keepLoggedIn: boolean;
  }): Observable<any> {
    return this._httpClient.post<any>(
      environment.apiURL + environment.apiVersion + '/auth/login',
      {
        username: credentials.email,
        password: crypto.SHA512(credentials.password).toString(),
        keepSessionOpen: credentials.keepLoggedIn,
      }
    );
  }

  logOut() {
    environment.loggedIn = false;
    environment.username = '';
    return true;
  }

  getProfile(): Observable<any> {
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/users/profile'
    );
  }
  register(userData: any): Observable<any> {
    return this._httpClient.post<any>(
      environment.apiURL + environment.apiVersion + '/auth/register',
      {
        username: userData?.username,
        email: userData?.email,
        password: crypto.SHA512(userData?.password).toString(),
        lastName: userData?.lastName,
        name: userData?.name,
        dni: userData?.dni,
        address: userData?.address,
        phone: userData?.phone,
      }
    );
  }
  updateProfile(userId: string, userData: any): Observable<any> {
    const updatePayload: any = {};

    if (userData.username) {
      updatePayload.username = userData.username;
    }
    if (userData.email) {
      updatePayload.email = userData.email;
    }
    if (userData.password) {
      updatePayload.password = crypto.SHA512(userData.password).toString(); 
    }
    if (userData.lastName) {
      updatePayload.lastName = userData.lastName;
    }
    if (userData.name) {
      updatePayload.name = userData.name;
    }
    if (userData.dni) {
      updatePayload.dni = userData.dni;
    }
    if (userData.address) {
      updatePayload.address = userData.address;
    }
    if (userData.phone) {
      updatePayload.phone = userData.phone;
    }

    return this._httpClient.patch<any>(
      `${environment.apiURL}${environment.apiVersion}/users/${userId}`,
      updatePayload
    );
  }


}
