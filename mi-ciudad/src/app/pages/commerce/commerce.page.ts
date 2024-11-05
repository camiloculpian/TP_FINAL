import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel, ModalController, NavController } from '@ionic/angular/standalone';
import { RubroSelectPage } from '../rubro-select/rubro-select.page';
import { Rubro } from 'src/app/core/interfaces/rubro';
import { CommerceService } from 'src/app/core/services/commerce.service';
import { Router } from '@angular/router';

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
  
  selectedRubrosText = '0 Items';
  // ACA VA EL CODIGO DEL RUBRO
  selectedRubros: Rubro[] = [];


  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private commerceService : CommerceService,
    private routerOutlet: Router,
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
    
    console.log('SALIENDO CommercePage <- OnInit')
  }

  enviarFormulario() {
    console.log('Datos del formulario:', this.localComercialDataForm);
    this.localComercialDataForm.controls['rubros'].setValue(this.selectedRubros)
    console.log(this.localComercialDataForm.value)
    this.commerceService.addCommerce(this.localComercialDataForm.value).subscribe(
      {
        next: (resp) => {
          // TO-DO: Mostrar El comercio se creo de manera exitosa
          this.routerOutlet.navigate(['/main/home']);
        },
        error: (err) => {
          // TO-DO: Mostrar El ERROR
          alert(err?.message)
        }
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
    const modal = await this.modalController.create({
      component: RubroSelectPage,
      componentProps: { 
        title:"Seleccione Rubro/s", 
        selectedRubros: this.selectedRubros,
      }
    });
    modal.onDidDismiss().then( (event) => {this.rubrosSelectionChanged(event.data)});
    modal.present();
  }

  addCommerceCancel(e:Event){
    e.preventDefault()
    this.navCtrl.back();
  }
}
