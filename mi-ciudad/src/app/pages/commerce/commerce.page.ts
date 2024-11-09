import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel, ModalController, NavController } from '@ionic/angular/standalone';
import { RubroSelectPage } from '../rubro-select/rubro-select.page';
import { Rubro } from 'src/app/core/interfaces/rubro';
import { CommerceService } from 'src/app/core/services/commerce.service';
import { camera } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.page.html',
  styleUrls: ['./commerce.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf, NgFor, NgForOf, RubroSelectPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommercePage implements OnInit {

  buttonDisabled:boolean = false;
  frontPicture:string='../../../assets/commerce-avatar.svg';// Imagen de frente del negocio predeterminada...
  private imageFile!: File;

  public localComercialDataForm!: FormGroup;
  
  selectedRubrosText = '0 Items';
  selectedRubros: Rubro[] = [];


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private commerceService : CommerceService,
  ) { 
    addIcons({ camera });
  }

  ngOnInit() {
    console.log('ENTRANDO CommercePage -> OnInit')
    this.localComercialDataForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      rubros: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', []],
      direccion: ['', [Validators.required]],
    })
    
    console.log('SALIENDO CommercePage <- OnInit')
  }

  enviarFormulario(e: Event) {
    e.preventDefault();
    this.localComercialDataForm.controls['rubros'].setValue(this.selectedRubros);
    
    // console.log('Datos del formulario:', this.localComercialDataForm);
    if(this.localComercialDataForm.valid){
      this.buttonDisabled =true;
      const formData = new FormData()
      const commerceData = this.localComercialDataForm.value;
      if (this.imageFile) {
        formData.append('frontPicture', this.imageFile, this.imageFile.name)
      }
      formData.append('nombre', commerceData.nombre)
      formData.append('descripcion', commerceData.descripcion)
      formData.append('correo', commerceData.correo)
      formData.append('rubros', commerceData.rubros)
      formData.append('telefono', commerceData.telefono)
      formData.append('direccion', commerceData.direccion)



      console.log(formData);
      this.commerceService.addCommerce(formData).subscribe(
        {
          next: (resp) => {
            // TO-DO: Mostrar El comercio se creo de manera exitosa
            this.modalController.dismiss()
          },
          error: (err) => {
            // TO-DO: Mostrar El ERROR
            console.log(err);
            alert('Ups!!!, Ocurrio un ERROR: \n Codigo del ERROR:'+ err?.status)
            this.buttonDisabled =false;
          }
        }
      );
    }else{
      alert('Verifique los datos del formulario')
    }
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
    this.modalController.dismiss()
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
      });
      if (image?.webPath) {
        this.frontPicture = image.webPath;
        const response = await fetch(image.webPath); 
        const blob = await response.blob();
        this.imageFile = new File([blob], 'frontPicture.jpg', { type: 'image/jpeg' });
      }
    } catch (e) {
      console.log(e);
      // this.showAlert('Error', 'No se pudo acceder a la cámara.');
    }
  }
}
