import { Rubro } from "./rubro";

export enum Tramite {
    ALTA = 'Alta',
    ACTUALIZACION = 'Actualización',
    BAJA = 'Baja'
}

export interface Commerce{
    id: number;
    nombre: string;
    rubros: Rubro[];
    tramite: Tramite,
    correo: string,
    telefono: string,
    direccion: string
}