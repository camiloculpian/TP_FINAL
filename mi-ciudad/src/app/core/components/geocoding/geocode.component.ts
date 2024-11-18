import {Component, EventEmitter, Output} from '@angular/core';
import { NominatimResponse } from '../../interfaces/nominatim-response';
import { NominatimService } from '../../services/nominatim.service';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSearchbar } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { search } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  //styleUrls: ['./geocoding.component.scss']
  standalone: true,
  imports: [IonInput, IonRow, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, NgFor],
  providers: [NominatimService],
})

export class GeocodingComponent {
  timeout: any;
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults!: NominatimResponse[];

  constructor(
    private nominatimService: NominatimService
  ) {
    addIcons({ search });
  }

  addressLookup(event:any) {
    console.log('-> addressLookup(event:any)')
    console.log(event?.target?.value)
    let address = event?.target?.value
    if (address?.length > 10) {
      this.nominatimService.addressLookup(address).subscribe(
        results => {
            console.log(results);
            console.log('<- addressLookup(event:any)')
            this.searchResults = results;
            //this.searchResults = [];
        }
      );
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

  callEvent(event: any){
    if(this.timeout != null){
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.addressLookup(event)
    },2500);     
  } 

}