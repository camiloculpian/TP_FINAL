import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';  
import { Commerce } from '../interfaces/commerce';

@Injectable({
  providedIn: 'root',
})
export class CommerceService {
  constructor(private _httpClient: HttpClient) {}

  getCommerces(): Observable<any> {
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/commerce'
    );
  }

  addCommerce(commerce : Commerce){
    
  }
}