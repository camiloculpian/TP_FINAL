import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Platform, ToastController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@awesome-cordova-plugins/network/ngx';


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
    Network
  ]
})
export class AppComponent {
  private lastBack = Date.now();
  constructor(
    private platform: Platform,
    private network: Network,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.platform.backButton.subscribe(() => {
      if (Date.now() - this.lastBack < 500) { // logic for double tap: delay of 500ms between two clicks of back button
        (navigator as any).app.exitApp();
      }
      this.lastBack= Date.now();
  });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.platform.ready().then(() => {
      this.verificarConexion()
    })
  }

  async verificarConexion() {
    // Verificar la conexión de red
    const tipoConexion = this.network.type;
    if (!tipoConexion || tipoConexion === 'none') {
      await this.mostrarErrorToast('No hay conexión de red...');
      return;
    }
    // Verificar la conexión con el backend
    console.log('chequeando coneccion con el servidor....');
    await this.http.get(environment.apiURL+environment.apiVersion).subscribe(
      {
        next: (resp) =>{},
        error: (err) => {
          console.log('Error de conexión con el servidor:', err);
          console.log(err);
          this.mostrarErrorToast('No hay coneccion con el servidor!!!')
        }
      }
    );
  }
  // Función para mostrar el toast
  async mostrarErrorToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'danger',
      duration: 7000,
      position: 'bottom',
    });
    await toast.present();
  }
}
