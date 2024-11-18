import {Component, EventEmitter, Output} from '@angular/core';
import { NominatimResponse } from '../../interfaces/nominatim-response';
import { NominatimService } from '../../services/nominatim.service';
import { IonInput } from '@ionic/angular/standalone';



@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  //styleUrls: ['./geocoding.component.scss']
  standalone: true,
  imports: [IonInput],
  providers: [NominatimService],
})

export class GeocodingComponent {
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults!: NominatimResponse[];

  constructor(private nominatimService: NominatimService) {
  }

  addressLookup(event:any) {
    console.log('-> addressLookup(event:any)')
    console.log(event?.target?.value)
    let address = event?.target?.value
    if (address?.length > 3) {
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

}