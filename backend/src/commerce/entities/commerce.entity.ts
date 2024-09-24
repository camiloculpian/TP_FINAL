
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// TAL VEZ LOS ENUMERADOS DEBEN DE IR EN OTRO LUGAR...
export enum Horario {
    LUNES_VIERNES_MATUTINO = 'Lunes a Viernes 8 AM - 12 PM',
    LUNES_VIERNES_VESPERTINO = 'Lunes a Viernes 4 PM - 8 PM',
}

export enum Tramite {
    ALTA = 'Alta',
    ACTUALIZACION = 'Actualización',
    BAJA = 'Baja'
}

@Entity('commerce')
export class Commerce {
    @PrimaryGeneratedColumn()
    id_commerce: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string; // Descripción de la rama comercial

    @Column({ type: 'varchar', length: 100 }) 
    ubicacion: string; // Coordenadas geográficas del lugar

    @Column({ type: 'enum', enum:Horario })
    horario: Horario;

    @Column({ type: 'varchar', length: 255 })
    imagen: string;

    // @Column({ type: 'enum', enum: ['Alta', 'Actualización'] })
    // tramite: 'Alta' | 'Actualización';
    @Column({ type: 'enum', enum: Tramite })
    tramite: Tramite;
}
