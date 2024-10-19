import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { environment } from 'src/app/app.component';
import { person, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  mostrarFormulario = false;
  public localComercialDataForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      addIcons({add});
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.localComercialDataForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nombre_negocio: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    })
  }
  navigateToProfile(){
    this.router.navigate(['profile']);
  }

  enviarFormulario() {
    console.log('Datos del formulario:', this.localComercialDataForm);
    this.limpiarFormulario();
    this.mostrarFormulario = false; 
  }

  limpiarFormulario() {
    this.localComercialDataForm.reset()
  }
}