import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, IonCol, AlertController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { pencil } from "ionicons/icons";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCol, IonAvatar, IonItem, IonLabel, IonInput, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPage implements OnInit {
  public userDataForm!: FormGroup;

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
      password: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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

  register() {
    if (this.userDataForm.valid) {
      const userData = this.userDataForm.value;

      this.authService.register(userData).subscribe(
        response => {
          console.log('Registro exitoso', response);

          this.showAlert('Registro Exitoso', 'Usuario registrado con éxito');

          this.userDataForm.reset();

          this.router.navigate(['login']);
      
        },
        error => {
          console.error('Error en el registro', error);
          this.showAlert('Error', 'No se pudo registrar el usuario. Inténtelo nuevamente.');
        }
      );
    }
  }
}
