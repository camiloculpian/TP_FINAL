import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, AlertController, IonButton, IonGrid, IonRow, IonCol, IonThumbnail } from '@ionic/angular/standalone';
import { pencil, camera, image } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { environment } from 'src/environments/environment';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonCol, IonAvatar, IonItem, IonLabel, IonInput, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonGrid, IonRow, IonThumbnail],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage implements OnInit {
  public userDataForm!: FormGroup;
  public profilePicture: string = '../../../assets/avatar.svg'; // Imagen de perfil predeterminada

  private imageFile!: File; // Archivo de imagen seleccionado
  private userId: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {
    addIcons({ pencil, camera, image });
  }

  ngOnInit() {
    this.userDataForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]], // Contraseña actual obligatoria
      newPassword: ['', [Validators.minLength(4)]], // Nueva contraseña opcional
      lastName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.authService.getProfile().subscribe({
      next: (resp) => {
        this.userId = resp.data.id;
        this.profilePicture = environment.apiURL+'/uploads/profiles/users/'+resp.data.profilePicture || this.profilePicture; // Cargar la foto de perfil del servidor
        this.userDataForm.patchValue({
          username: resp.data.username,
          email: resp.data.email,
          lastName: resp.data.lastName,
          name: resp.data.name,
          dni: resp.data.dni,
          address: resp.data.address,
          phone: resp.data.phone,
        });
      },
      error: (error) => {
        console.log(error);
      }
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

  // Abrir la cámara
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

  // Abrir la galería
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

  onSave(e: Event) {
    e.preventDefault();

    if (this.userDataForm.valid) {
      const updatedProfile = new FormData();
      const userData = this.userDataForm.getRawValue();
      userData.append

      updatedProfile.append('username', userData.username);
      updatedProfile.append('email', userData.email);
      updatedProfile.append('name', userData.name);
      updatedProfile.append('lastName', userData.lastName);
      updatedProfile.append('dni', userData.dni);
      updatedProfile.append('address', userData.address);
      updatedProfile.append('phone', userData.phone);

      if (this.imageFile) {
        updatedProfile.append('profilePicture', this.imageFile, this.imageFile.name);
      }else{
      }

      // TO-DO:
      // SI EL CAMPO newPassword no esta vacio agregar para cambiar la contrasenia

      console.log(updatedProfile.getAll);

      this.authService.updateProfile(this.userId, updatedProfile).subscribe({
        next: () => {
          this.showAlert('Actualización Exitosa', 'El perfil ha sido actualizado correctamente.');
        },
        error: (error) => {
          this.showAlert(error.error.status || 'Error', error.error.message || 'No se pudo actualizar el perfil');
        }
      });
    } else {
      this.showAlert('Formulario Inválido', 'Por favor, revise los campos e intente nuevamente.');
    }
  }

  onImageError(event: any): void {
    event.target.src = '../../../assets/rota.svg'
  }
  
}
