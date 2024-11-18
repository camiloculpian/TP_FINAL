export class NominatimResponse {
    constructor(
      public lat: number,
      public lon: number,
      public display_name: string
    ) { }
  }

  export interface NominatimResponse {
      lat: number,
      lon: number,
      display_name: string

  }