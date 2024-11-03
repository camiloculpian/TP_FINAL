import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';  

@Injectable({
  providedIn: 'root',
})
export class RubrosService {
  constructor(private _httpClient: HttpClient) {}

  getRubros(): Observable<any> {
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/rubro'
    );
  }
}