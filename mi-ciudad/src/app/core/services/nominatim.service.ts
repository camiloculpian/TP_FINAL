// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';  

// @Injectable({
//   providedIn: 'root',
// })
// export class NominatimService {
//   constructor(private _httpClient: HttpClient) {}
//   nominatimURL: string ='https://nominatim.openstreetmap.org/search?'
//   getCoordByAddress(address: string): Observable<any> {
//     return this._httpClient.get<any>(
//         // 'https://router.project-osrm.org/locate?request=GetGeocoding&nbaddresses=1&outputFormat=json&addresses_0=1240+Place+Jourdan+PARIS',
//         'http://nominatim.openstreetmap.org/search?format=json&q=bakery+in+london',
//     );
//   }
// }

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { NominatimResponse } from '../interfaces/nominatim-response';
//import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from '../app.constants';

export const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

@Injectable({
    providedIn: 'root',
  })
export class NominatimService {

  constructor(private _httpClient: HttpClient) {
  }

  addressLookup(req?: any): Observable<any>/*: Observable<NominatimResponse[]>*/ {
    console.log('->addressLookup(req?: any): Observable<any>')
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&bounded=1`;
    console.log('<-addressLookup(req?: any): Observable<any>')
    return this._httpClient.get(url)
  }
}