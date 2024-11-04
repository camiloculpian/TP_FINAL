import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonModal, IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RubrosService } from 'src/app/core/services/rubros.service';
import { Router } from '@angular/router';
// import { IonModal } from '@ionic/angular';
import { Rubro, RubroSelectPage } from '../rubro-select/rubro-select.page';
import { map } from 'rxjs';

@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.page.html',
  styleUrls: ['./commerce.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf, NgFor, NgForOf, RubroSelectPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommercePage implements OnInit {
  // EL MODAL PARA ABRIR LA PAGINA
  @ViewChild('modal', { static: true }) modal!: IonModal;

  public localComercialDataForm!: FormGroup;
  
  rubros : Rubro[] = [];
  mostrarFormulario = false;


  selectedRubrosText = '0 Items';
  // ACA VA EL CODIGO DEL RUBRO
  selectedRubros: Rubro[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private rubrosService : RubrosService,
  ) { }

  ngOnInit() {
    this.localComercialDataForm = this.formBuilder.group({
      nombre_negocio: ['', [Validators.required]],
      rubro_negocio: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    })
  }

  enviarFormulario() {
    console.log('Datos del formulario:', this.localComercialDataForm);
    this.limpiarFormulario();
    this.mostrarFormulario = false; 
  }

  limpiarFormulario() {
    this.localComercialDataForm.reset()
  }

  rubrosSelectionChanged(rubros :Rubro[]){
    this.selectedRubros = rubros;
    console.log(this.selectedRubros)
    //this.selectedRubrosText = this.formatData(this.selectedRubros);
    this.modal.dismiss();
  }

}
