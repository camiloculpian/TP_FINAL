// import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
// import { add } from 'ionicons/icons';
// import { addIcons } from 'ionicons';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgIf } from '@angular/common';


// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: true,
//   imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class HomePage implements OnInit {
//   mostrarFormulario = false;
//   public localComercialDataForm!: FormGroup;
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//       addIcons({add});
//   }

//   ngOnInit() {
//     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//     //Add 'implements OnInit' to the class.
//     this.localComercialDataForm = this.formBuilder.group({
//       nombre_negocio: ['', [Validators.required]],
//       rubro_negocio: ['', [Validators.required]],
//       correo: ['', [Validators.required]],
//       telefono: ['', [Validators.required]],
//       direccion: ['', [Validators.required]],
//       foto: ['', [Validators.required]]
//     })
//   }
//   navigateToProfile(){
//     this.router.navigate(['profile']);
//   }

//   enviarFormulario() {
//     console.log('Datos del formulario:', this.localComercialDataForm);
//     this.limpiarFormulario();
//     this.mostrarFormulario = false; 
//   }

//   limpiarFormulario() {
//     this.localComercialDataForm.reset()
//   }
// }




import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  mostrarFormulario = false;
  public localComercialDataForm!: FormGroup;
  public comercios!: [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.obtenerComercios();
    this.localComercialDataForm = this.formBuilder.group({
      nombre_negocio: ['', [Validators.required]],
      rubro_negocio: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      // foto: ['', [Validators.required]]
    });
  }

  async obtenerComercios() {
    const apiUrl = `${environment.apiURL}${environment.apiVersion}`;
    try {
      this.comercios = await this.http.get<any>(apiUrl).toPromise();
      console.log(this.comercios)
    } catch (error) {
      console.error('Error al obtener los comercios:', error);
    }
  }

  async enviarFormulario() {
    const formData = {
      nombre: this.localComercialDataForm.value.nombre_negocio || null,
      rubro: this.localComercialDataForm.value.rubro_negocio || null,
      correo: this.localComercialDataForm.value.correo || null,
      telefono: this.localComercialDataForm.value.telefono || null,
      direccion: this.localComercialDataForm.value.direccion || null,
      // imagen: this.localComercialDataForm.value.foto || null
    };
  
    const apiUrl = `${environment.apiURL}${environment.apiVersion}/commerce`; 
  
    try {
      console.log('Datos a enviar:', formData);
      const response = await firstValueFrom(this.http.post(apiUrl, formData));
      console.log('Respuesta del servidor:', response);
      await this.presentAlert('Éxito', 'Datos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar:', error);
      await this.presentAlert('Error', 'Ocurrió un error al guardar los datos.');
    }
  
    this.limpiarFormulario();
    this.mostrarFormulario = false;
  }
  
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  limpiarFormulario() {
    this.localComercialDataForm.reset();
  }

  async mostrarAlertaEliminar() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Este es el botón de eliminar.',
      buttons: ['Cancel', 'OK'],
    });
    await alert.present();
  }

  async mostrarAlertaEditar() {
    const alert = await this.alertController.create({
      header: 'Editar',
      message: 'Esta es la sección de editar.',
      buttons: ['Cancel', 'OK'],
    });
    await alert.present();
  }
}
