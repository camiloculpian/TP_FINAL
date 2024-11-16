import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonSearchbar} from "@ionic/angular/standalone";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NativeGeocoder} from '@capgo/nativegeocoder';
import {Point} from "src/app/core/interfaces";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SearchComponent {
  @Output() cancelSearch: EventEmitter<any> = new EventEmitter(undefined);
  @Output() coordinates: EventEmitter<Point> = new EventEmitter<Point>();

  buscando = false;
  ubicacion: string | undefined = undefined

  constructor() {
  }

  ngOnInit() {

  }

  async reverseGeocode() {
    if (!this.ubicacion && this.buscando) {
      return;
    }
    this.buscando = true;
    const response = await NativeGeocoder.forwardGeocode({
      apiKey: environment.googleMapsKey,
      addressString: this.ubicacion ? this.ubicacion : '',
      useLocale: true,
      defaultLocale: 'es_AR'
    })
    this.buscando = false;
    if (response.addresses) {
      const address = response.addresses[0];
      const {latitude, longitude} = address
      this.coordinates.emit({lat: latitude, lng: longitude});
    }

  }

  onClose() {
    if (this.buscando) {
      return;
    }
    this.ubicacion = undefined;
    this.cancelSearch.emit()
  }

}