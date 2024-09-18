import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Platform} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


export const environment = {
  loggedIn:false,
  username:'',
  name:'',
  lastName:'',
  profilePicture:''
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private lastBack = Date.now();
  constructor(private platform: Platform) {
    this.platform.backButton.subscribe(() => {
      if (Date.now() - this.lastBack < 500) { // logic for double tap: delay of 500ms between two clicks of back button
        (navigator as any).app.exitApp();
      }
      this.lastBack= Date.now();
  });
  }
  
}
