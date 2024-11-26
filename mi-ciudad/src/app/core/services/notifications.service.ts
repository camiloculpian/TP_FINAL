import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';  

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private _httpClient: HttpClient) {}

  getCountUnreadNotifications(){
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/notifications/countUnread'
    );
  }
  getNotifications(): Observable<any> {
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/notifications'
    );
  }
  
  getNotification(id: string): Observable<any> { 
    return this._httpClient.get<any>(
      environment.apiURL + environment.apiVersion + '/notifications/' + id
    );
  }
}