import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonText, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from "ionicons";
import { eyeOutline, eyeOffOutline, person, lockClosed } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from 'src/environments/environment';  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonText, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit {
  public loginForm!: FormGroup;
  showPassword = false;
  isAlertOpen = false;
  alertMessageHeader ='';
  alertMessage ='';
  alertButtons = ['Aceptar'];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthenticationService,
  ) { 
      addIcons({person,lockClosed, eyeOutline, eyeOffOutline});
  }

  ngOnInit() {
    this.loginForm  = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      keepLoggedIn: false,
    });
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  login() {
    console.log(this.loginForm.value)
    this.authService.logIn(this.loginForm.value).subscribe(
      {
        next: (resp) => {
          environment.loggedIn=true;
          environment.username = resp.data.email;
          // TO-DO: ver auth.interceptor.ts !!!
          //if(this.loginForm?.value?.keepLoggedIn){
            localStorage.setItem('user', JSON.stringify(resp.data));
          //}
          this.router.navigate(['']);
        },
        error: (err) => {
          this.alertMessageHeader = err.error.status
          this.alertMessage = err.error.message
          this.setOpen(true);
        }
      }
    );
  }

  

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

}
