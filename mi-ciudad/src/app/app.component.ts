import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Network } from '@capacitor/network';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';  
import { Observable, timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  // providers:[
  //   Network
  // ]
})
export class AppComponent {
  private lastBack = Date.now();
  constructor(
    private platform: Platform,
    //private network: Network,
    private _httpClient: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private authService : AuthenticationService,
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
    console.log('-> INICIALIZANDO APP...');
    // 1 - Chequear coneccion de red
    Network.addListener('networkStatusChange', status => {
      console.log(status.connected);
      status.connected?null:this.mostrarErrorToast('Verifique que este conectado a la red....');
      // 2 - Chequear si hay coneccion con el backend
      this.getNetworkTestRequest();
    })
    this.authService.isLoggedIn().subscribe(
      {
        next: (resp) => {
          environment.loggedIn=true;
          environment.username = resp.data.email;
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.router.navigate(['']);
        },
        error: (error) => {
          this.mostrarErrorToast('Hubo un error verificando su sesion!'+error.status)
        }
      }
    )
    console.log('<- INICIALIZANDO APP...');
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

  

  private getNetworkTestRequest() {
    this._httpClient.get(environment.apiURL + environment.apiVersion)
    .pipe(
      timeout(5000) // CAMBIAR A UN PARAMETRO CORRECTO SEGUN ESTADISTICAS DE RED
    )
    .subscribe({
      next: (resp) => {
        console.log('-> RESPUESTA DESDE BACKEND: OK!', resp);
      },
      error: (error) => {
        this.mostrarErrorToast('Error en la conexión al backend!...');
      }
    });
  }
}
