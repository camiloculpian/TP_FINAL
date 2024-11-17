import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';  

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  constructor(private _httpClient: HttpClient) {}
  nominatimURL: string ='https://nominatim.openstreetmap.org/search?'
  getCoordByAddress(address: string): Observable<any> {
    return this._httpClient.get<any>(
        // 'https://router.project-osrm.org/locate?request=GetGeocoding&nbaddresses=1&outputFormat=json&addresses_0=1240+Place+Jourdan+PARIS',
        'http://nominatim.openstreetmap.org/search?format=json&q=bakery+in+london',
    );
  }
}