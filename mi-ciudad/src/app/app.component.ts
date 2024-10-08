import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Platform} from '@ionic/angular';

// Agrego las variables globales (SEGURAMENTE SE HACE DE OTRA FORMA VER DESPUES!!!)
export const environment = {
  loggedIn:false,
  username:'',
  apiURL:'http://192.168.100.4:3000',
  apiVersion:'/api/v1'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  providers:[
  ]
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
