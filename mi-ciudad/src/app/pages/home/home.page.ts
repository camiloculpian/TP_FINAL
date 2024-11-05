import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { CommercePage } from '../commerce/commerce.page';
import { CommerceService } from 'src/app/core/services/commerce.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf, NgFor, NgForOf, CommercePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  

  constructor(
    private commerceService: CommerceService,
    private router: Router
  ) {
      addIcons({add});
  }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.commerceService.getCommerces().subscribe(
      {
        next(resp) {
          console.log(resp);
        },
        error(err) {
          console.log(err);
        }
      }
    )
  }
  
  navigateToProfile(){
    this.router.navigate(['profile']);
  }

  addCommerce(){
    this.router.navigate(['commerce']);
  }

}

