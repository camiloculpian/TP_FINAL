import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonIcon, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { CommercePage } from '../commerce/commerce.page';
import { CommerceService } from 'src/app/core/services/commerce.service';
import { Commerce } from 'src/app/core/interfaces/commerce';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon, IonTabBar, IonTabs, IonRouterOutlet, IonApp, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonText, FormsModule, ReactiveFormsModule, NgIf, NgFor, NgForOf, CommercePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  commerces: Commerce[] = [];
  
  public relPicturesPath = environment.apiURL+'/uploads/commerces/pictures/';
  
  constructor(
    private modalController: ModalController,
    private commerceService: CommerceService,
    private router: Router
  ) {
      addIcons({add});
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter()')
    this.getCommerces();
  }

  ionViewWillLeave() {

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

}

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getCommerces()
  }

  navigateToProfile(){
    this.router.navigate(['profile']);
  }

  getCommerces(){
    this.commerceService.getCommerces().subscribe(
      {
        next: (resp) => {
          console.log(resp);
          this.commerces = resp.data
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  async addCommerce(){
    const modal = await this.modalController.create({
      component: CommercePage,
      componentProps: { 
      }
    });
    modal.onDidDismiss().then( (event) => {this.ngOnInit()});
    modal.present();
  }

  async openCommerce(commerce: Commerce){
    console.log(commerce)
    const modal = await this.modalController.create({
      component: CommercePage,
      componentProps: { 
        commerce: commerce
      }
    });
    modal.onDidDismiss().then((event) => {this.ngOnInit()});

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

    modal.present();
  }
}

