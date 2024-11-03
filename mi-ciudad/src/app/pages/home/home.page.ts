import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RubrosService } from 'src/app/core/services/rubros.service';


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
  constructor(
    private formBuilder: FormBuilder,
    private rubrosService : RubrosService,
    private router: Router
  ) {
      addIcons({add});
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.localComercialDataForm = this.formBuilder.group({
      nombre_negocio: ['', [Validators.required]],
      rubro_negocio: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    })
    this.rubrosService.getRubros().subscribe(
      {
        next: (resp) => {
          console.log(resp?.data)
        },
        error: (err) => {}
      }
    )

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

