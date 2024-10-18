import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Platform} from '@ionic/angular';

// Agrego las variables globales (SEGURAMENTE SE HACE DE OTRA FORMA VER DESPUES!!!)
export const environment = {
  loggedIn:false,
  username:'',
  apiURL:'http://10.68.1.100:3000',
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

  checkConnection(){
    // implementar chequea la coneccion de red y si tiene red chequea qla coneccion con el backend
    // si no tiene red o no tiene coneccion con el backend, muestra toast no tiene coneccion de red
  }
  
}
