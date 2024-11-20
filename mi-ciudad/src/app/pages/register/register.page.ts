import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, IonCol, AlertController, IonButton, IonGrid, IonRow, IonThumbnail } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { pencil, camera, image } from "ionicons/icons";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import * as crypto from 'crypto-js'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCol, IonAvatar, IonItem, IonLabel, IonInput, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonGrid, IonRow, IonThumbnail],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPage implements OnInit {
  public userDataForm!: FormGroup;
  public profilePicture: string = '../../../assets/avatar.svg'; 
  private imageFile: File | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {
    addIcons({ pencil, camera, image });
  }

  ngOnInit() {
    this.userDataForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      address: [''], 
      phone: [''],
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
      });
      if (image?.webPath) {
        this.profilePicture = image.webPath;
        const response = await fetch(image.webPath); 
        const blob = await response.blob();
        this.imageFile = new File([blob], 'profilePicture.jpg', { type: 'image/jpeg' });
      }
    } catch (e) {
      console.log(e);
      this.showAlert('Error', 'No se pudo acceder a la cámara.');
    }
  }

  async openCameraRoll() {
    try {
      const images = await Camera.pickImages({
        quality: 100,
        limit: 1,
      });
      const selectedImage = images.photos[0];
      if (selectedImage?.webPath) {
        this.profilePicture = selectedImage.webPath;
        const response = await fetch(selectedImage.webPath); 
        const blob = await response.blob();
        this.imageFile = new File([blob], 'profilePicture.jpg', { type: 'image/jpeg' });
      }
    } catch (e) {
      console.log(e);
      this.showAlert('Error', 'No se pudo seleccionar una imagen.');
    }
  }
  
  register() {
    if (this.userDataForm.valid) {
      const formData = new FormData();
      const userData = this.userDataForm.value;
  
      const hashedPassword = crypto.SHA512(userData.password).toString();
      formData.append('password', hashedPassword);
  
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('name', userData.name);
      formData.append('lastName', userData.lastName);
      formData.append('dni', userData.dni);
      if (userData.address) {
        formData.append('address', userData.address);
      }
      if (userData.phone) {
        formData.append('phone', userData.phone);
      }
  
      if (this.imageFile) {
        formData.append('profilePicture', this.imageFile, this.imageFile.name);
      }
  
      this.authService.register(formData).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.showAlert('Registro Exitoso', 'Usuario registrado con éxito');
  
          this.userDataForm.reset();
          this.profilePicture = '../../../assets/avatar.svg'; 
          this.imageFile = null; 
  
          this.router.navigate(['login']);
        },
        error => {
          console.error('Error en el registro', error);
          this.showAlert('Error', error.error?.message || 'No se pudo registrar el usuario.');
        }
      );
    }
  }

  onImageError(event: any): void {
    event.target.src = '../../../assets/rota.svg'
  }
}
