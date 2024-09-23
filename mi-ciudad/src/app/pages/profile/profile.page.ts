import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonInput, IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { person, pencil} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { environment } from 'src/app/app.component';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  // email!: string;
  // lastName!: string;
  // name!: string;
  public userDataForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router, private authService : AuthenticationService) {
    // this.email = environment.username;
    // this.lastName = environment.lastName;
    // this.name = environment.name;
    addIcons({pencil});
  }

  ngOnInit() {
    
    this.userDataForm  = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.email]],
    });
    const resp = this.authService.getProfile().subscribe(
      ((resp: any) => {
        // CORREGIR ACA HAY QUE SETEAR YA SE CREO ARRIBA!!!
        this.userDataForm  = this.formBuilder.group({
          email: [resp.data.email, [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(4)]],
          lastName: [resp.data.lastName, [Validators.required, Validators.email]],
          name: [resp.data.name, [Validators.required, Validators.email]],
        });
      }),
      ((error:any) => {
        console.log(error)
      })
    )
  }

  onSave(e:Event){
    e.preventDefault();
    this.router.navigate(['']);
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
