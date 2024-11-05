import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { RubroSelectPage } from '../rubro-select/rubro-select.page';
import { RubrosService } from 'src/app/core/services/rubros.service';
import { Rubro } from 'src/app/core/interfaces/rubro';
import { CommerceService } from 'src/app/core/services/commerce.service';

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

  selectedRubrosText = '0 Items';
  // ACA VA EL CODIGO DEL RUBRO
  selectedRubros: Rubro[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private rubrosService : RubrosService,
    private commerceService : CommerceService
  ) { }

  ngOnInit() {
    console.log('ENTRANDO CommercePage -> OnInit')
    this.localComercialDataForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      rubros: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    })
    if(this.rubros.length == 0)
    {
      this.rubrosService.getRubros().subscribe(
        {
          next: (resp) => {
            this.rubros = [...resp?.data];
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
    console.log('SALIENDO CommercePage <- OnInit')
  }

  enviarFormulario() {
    console.log('Datos del formulario:', this.localComercialDataForm);
    this.localComercialDataForm.controls['rubros'].setValue(this.selectedRubros)
    console.log(this.localComercialDataForm.value)
    this.commerceService.addCommerce(this.localComercialDataForm.value).subscribe(
      {
        next: (resp) => {},
        error: (err) => {console.log(err)}
      }
    );
  }

  limpiarFormulario() {
    this.localComercialDataForm.reset()
  }

  rubrosSelectionChanged(rubros :Rubro[]){
    this.selectedRubros = rubros;
    
    if(this.selectedRubros.length == 1){
      this.selectedRubrosText = this.selectedRubros[0].descripcion.length < 20? this.selectedRubros[0].descripcion:this.selectedRubros[0].descripcion.substring(0,16)+'...'
    }else{
      this.selectedRubrosText = this.selectedRubros.length.toString() + ' Items';
    }
  }

  async openRubroSelect(){
    const modal = await this.modalCtrl.create({
      component: RubroSelectPage,
      componentProps: { 
        title:"Seleccione Rubro/s", 
        rubros: this.rubros, 
        selectedRubros: this.selectedRubros,
      }
    });
    modal.onDidDismiss().then( (event) => {this.rubrosSelectionChanged(event.data)});
    modal.present();
  }

}
