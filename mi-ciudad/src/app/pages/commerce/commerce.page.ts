import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { Rubro, RubroSelectPage } from '../rubro-select/rubro-select.page';
import { IonModal } from '@ionic/angular';

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

  public localComercialDataForm!: FormGroup;
  
  rubros : Rubro[] = [];
  mostrarFormulario = false;


  selectedRubrosText = '0 Items';
  // ACA VA EL CODIGO DEL RUBRO
  selectedRubros: Rubro[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
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
    console.log(this.selectedRubros);
  }

  async openRubroSelect(){
    const modal = await this.modalCtrl.create({
      component: RubroSelectPage,
      componentProps: { 
        title:"Rubros Dynamics", 
        rubros: this.rubros, 
        selectedRubros: this.selectedRubros,
      }
    });
    modal.onDidDismiss().then( (event) => {this.rubrosSelectionChanged(event.data)});
    modal.present();
  }

}
