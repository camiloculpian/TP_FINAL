import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar, IonCol } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { pencil, person } from "ionicons/icons";
import { environment } from 'src/app/app.component';
import { Router } from '@angular/router';

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
  constructor(public formBuilder: FormBuilder,private router: Router,) {
      addIcons({pencil}); }

      ngOnInit() {
        this.userDataForm  = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(4)]],
          lastName: ['', [Validators.required, Validators.email]],
          name: ['', [Validators.required, Validators.email]],
        });
      }
      
      register(e:Event){
        e.preventDefault();
        this.router.navigate(['login']);
      }
}
