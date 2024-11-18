import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonTabBar, IonIcon, IonItem, ModalController } from '@ionic/angular/standalone';
import { RubroSelectPage } from '../rubro-select/rubro-select.page';
import { Rubro } from 'src/app/core/interfaces/rubro';
import { CommerceService } from 'src/app/core/services/commerce.service';
import { camera, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Commerce } from 'src/app/core/interfaces/commerce';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/core/interfaces/photos';
import { Position } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import * as L from "leaflet";
import { NominatimService } from 'src/app/core/services/nominatim.service';
import { GeocodingComponent } from 'src/app/core/components/geocoding/geocode.component';
import { NominatimResponse } from 'src/app/core/interfaces/nominatim-response';

@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.page.html',
  styleUrls: ['./commerce.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonIcon,
    IonTabBar,
    IonApp,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    RubroSelectPage,
    QRCodeModule,
    GeocodingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommercePage implements OnInit {
  @Input() commerce!: Commerce;

  // @ViewChild('map', { static: true }) 
  // mapRef!: ElementRef;
  // map!: GoogleMap;
  // showSearch: boolean = false;



   
  locationInicial: WritableSignal<Position | undefined> = signal(undefined);
  locationActual: WritableSignal<Position | undefined> = signal(undefined);
  hasPermissions: boolean = false;

  buttonDisabled:boolean = false;
  frontPicture:string='../../../assets/commerce-avatar.svg';// Imagen de frente del negocio predeterminada...
  public relPicturesPath = environment.apiURL+'/uploads/commerces/pictures/'
  public getCommercesDataPath = environment.apiURL + environment.apiVersion + '/commerce/pdf/'
  private imageFile!: File;
  private imageFiles: File[] = [];

  public localComercialDataForm!: FormGroup;

  selectedRubrosText = '0 Items';
  selectedRubros: Rubro[] = [];
  selectedImages: string[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private commerceService: CommerceService,
    private toastCtl: ToastController
  ) {
    addIcons({camera,trash});
  }

  ngOnInit() {
    console.log('ENTRANDO CommercePage -> OnInit');
    this.localComercialDataForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      rubros: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', []],
      direccion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });
    if (this.commerce) {
      // TO-DO: si lke paso los datos de un comercio es una edicion y tengo que setear los datos del comercio
      this.commerce.photos.forEach((photo) => {
        let p2 = photo as Photo;
        this.selectedImages.push(
          environment.apiURL + '/uploads/commerces/pictures/' + p2.filename
        );
      });
      // console.log('COMMERCE UBICACION')
      // console.log(this.commerce.ubicacion);
      // console.log('lat: '+ this.commerce.ubicacion.split(',')[0].trim())
      // console.log('long: '+ this.commerce.ubicacion.split(',')[1].trim())
      this.localComercialDataForm.patchValue({
        nombre: this.commerce.nombre,
        descripcion: this.commerce.descripcion,
        frontPicture: this.commerce.frontPicture,
        rubros: this.commerce.rubros,
        correo: this.commerce.correo,
        telefono: this.commerce.telefono,
        direccion: this.commerce.direccion,
        ubicacion: this.commerce.ubicacion,
        photos: this.selectedImages,
        // latitud: parseFloat(this.commerce.ubicacion.split(',')[0].trim()),
        // longitud: parseFloat(this.commerce.ubicacion.split(',')[1].trim()),
      });
      // TO-DO: para actualizar las imagenes hay que ver si van imagenes nuevas... si es asi agregarlas, y poner un botoncito para eliminar las otras o editarlas...
      this.rubrosSelectionChanged(this.commerce.rubros);
      // CHAQUEAR SI frontPicture no es null
      if (this.commerce.frontPicture) {
        this.frontPicture = this.relPicturesPath + this.commerce.frontPicture;
      }
    }
    console.log('SALIENDO CommercePage <- OnInit');
  }

  async ionViewDidEnter(){
    //await this.createMap();
    if(this.commerce){
      await this.initMap(this.commerce.ubicacion);
    }else{
      //await this.getCoordinatesByAddress('');
    }
  }

  eliminarImagen(index: number) {
    // Elimina la imagen en la posición específica
    this.selectedImages.splice(index, 1);
  }
  
  
  enviarFormulario(e: Event) {
    // TO-DO: Falta diferenciar si es una unsercion o si es una edicion (tal vez tener en cienta el input?)
    e.preventDefault();
    // console.log('Datos del formulario:', this.localComercialDataForm);
    if (this.localComercialDataForm.valid) {
      this.buttonDisabled = true;

      const formData = this.convertModelToFormData(
        this.selectedRubros,
        null,
        'rubros'
      );
      const commerceData = this.localComercialDataForm.value;

      if (this.imageFile) {
        formData.append('frontPicture', this.imageFile, this.imageFile.name);
      }

      if (this.imageFiles?.length > 0) {
        this.imageFiles.forEach((file: File, index) => {
          formData.append('photos', file, file.name);
        });
      }
      formData.append('nombre', commerceData.nombre);
      formData.append('descripcion', commerceData.descripcion);
      formData.append('correo', commerceData.correo);
      formData.append('telefono', commerceData.telefono);
      formData.append('direccion', commerceData.direccion);
      formData.append('ubicacion', `${commerceData.latitud};${commerceData.longitud}`);

      console.log(formData.getAll);
      if (this.commerce) {
        this.commerceService
          .editCommerce(this.commerce.id.toString(), formData)
          .subscribe({
            next: (resp) => {
              // TO-DO: Mostrar El comercio se creo de manera exitosa
              this.modalController.dismiss();
            },
            error: (err) => {
              // TO-DO: Mostrar El ERROR
              console.log(err);
              alert(
                'Ups!!!, Ocurrio un ERROR: \n Codigo del ERROR:' + err?.status
              );
              this.buttonDisabled = false;
            },
          });
      } else {
        this.commerceService.addCommerce(formData).subscribe({
          next: (resp) => {
            // TO-DO: Mostrar El comercio se creo de manera exitosa
            this.modalController.dismiss();
          },
          error: (err) => {
            // TO-DO: Mostrar El ERROR
            console.log(err);
            alert(
              'Ups!!!, Ocurrio un ERROR: \n Codigo del ERROR:' + err?.status
            );
            this.buttonDisabled = false;
          },
        });
      }
    } else {
      alert('Verifique los datos del formulario');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  limpiarFormulario() {
    this.localComercialDataForm.reset();
  }

  rubrosSelectionChanged(rubros: Rubro[]) {
    this.selectedRubros = rubros;

    if (this.selectedRubros.length == 1) {
      this.selectedRubrosText =
        this.selectedRubros[0].descripcion.length < 20
          ? this.selectedRubros[0].descripcion
          : this.selectedRubros[0].descripcion.substring(0, 16) + '...';
    } else {
      this.selectedRubrosText =
        this.selectedRubros.length.toString() + ' Items';
    }
  }

  async openRubroSelect() {
    const modal = await this.modalController.create({
      component: RubroSelectPage,
      componentProps: {
        title: 'Seleccione Rubro/s',
        selectedRubros: this.selectedRubros,
      },
    });
    modal.onDidDismiss().then((event) => {
      this.rubrosSelectionChanged(event.data);
    });
    modal.present();
  }

  addCommerceCancel(e: Event) {
    e.preventDefault();
    this.modalController.dismiss();
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
        this.imageFile = new File([blob], 'frontPicture.jpg', {
          type: 'image/jpeg',
        });
      }
    } catch (e) {
      console.log(e);
      // this.showAlert('Error', 'No se pudo acceder a la cámara.');
    }
  }

  async openCameraForImageFiles() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
      });
      if (image?.webPath) {
        this.selectedImages.push(image.webPath);
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        this.imageFiles.push(
          new File([blob], 'photos.jpg', { type: 'image/jpeg' })
        );
      }
    } catch (e) {
      console.log(e);
      // this.showAlert('Error', 'No se pudo acceder a la cámara.');
    }
  }

  // TO-DO: DIOS MIO!!! esto es ORRIBLE, pero hace su trabajo
  convertModelToFormData(
    model: any,
    form: FormData | null = null,
    namespace = ''
  ): FormData {
    let formData = form || new FormData();
    for (let propertyName in model) {
      if (
        !model.hasOwnProperty(propertyName) ||
        model[propertyName] == undefined
      )
        continue;
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: any) => {
          if (typeof element != 'object')
            formData.append(`${formKey}[]`, element);
          else {
            const tempFormKey = `${formKey}[${index}]`;
            this.convertModelToFormData(element, formData, tempFormKey);
          }
        });
      } else if (
        typeof model[propertyName] === 'object' &&
        !(model[propertyName] instanceof File)
      ) {
        this.convertModelToFormData(model[propertyName], formData, formKey);
      } else {
        formData.append(formKey, model[propertyName].toString());
      }
    }
    return formData;
  }

  downloadPDF(param:any){

  }
  ////////////////////////////////////////////////////////////////
  //                        Geolocalizacion                     //
  ////////////////////////////////////////////////////////////////

  private async initMap(ubicacion:string, popUp?:string) {
      const map = L.map('map').setView([
        parseFloat(ubicacion.split(',')[0].trim()), 
        parseFloat(ubicacion.split(',')[1].trim())], 
        60);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.Icon.Default.imagePath = "../../assets/leaflet/"
    L.marker([parseFloat(ubicacion.split(',')[0].trim()), parseFloat(ubicacion.split(',')[1].trim())]).addTo(map).bindPopup(popUp?popUp:'');
  }

  getCoordinatesByAddress(ubicacion:NominatimResponse){
    console.log(ubicacion.display_name);
    console.log(ubicacion.lat+','+ubicacion.lon);
    //this.initMap(ubicacion)
  }
  // async showMap(){
  //   console.log('-> async showMap()')
  //   const modal = await this.modalController.create({
  //     component: GoogleMap,
  //   });
  //   modal.onDidDismiss().then((event) => {this.ngOnInit()});
  //   modal.present();
  //   console.log('<- async showMap()')
  // }
  
}
// 