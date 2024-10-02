import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, AlertController } from '@ionic/angular/standalone';
import { pencil } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonItem, IonLabel, IonInput, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage implements OnInit {
  public userDataForm!: FormGroup;
  private userId: string = '';

  constructor(
    public formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    private alertController: AlertController 
  ) {
    addIcons({ pencil });
  }

  ngOnInit() {
    this.userDataForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]], // Contraseña actual obligatoria //Deberia haber una verificacion de la contraseña 
      password: ['', [Validators.minLength(4)]], // Nueva contraseña opcional
      lastName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  
    this.authService.getProfile().subscribe({
      next: (resp) => {
        this.userId = resp.data.id;
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

  onSave(e: Event) {
    e.preventDefault();

    if (this.userDataForm.valid) {
      const updatedProfile = this.userDataForm.getRawValue();

      this.authService.updateProfile(this.userId, updatedProfile).subscribe({
        next: (response) => {
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

  get email() {
    return this.userDataForm.get('email');
  }

  get lastName() {
    return this.userDataForm.get('lastName');
  }

  get name() {
    return this.userDataForm.get('name');
  }
}
