
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Tramite {
    ALTA = 'Alta',
    ACTUALIZACION = 'Actualización',
    BAJA = 'Baja'
}

export enum Rubro {
    KIOSKO = 'Kiosko',
    DRUGSTORE = 'Drugstore',
    MINIMERCADO = 'Minimercado'
}

@Entity('commerce')
export class Commerce {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'enum', enum: Rubro })
    rubro: Rubro;

    @Column({ type: 'varchar', length: 100 })
    correo: string;

    @Column({ type: 'varchar', length: 20 })
    telefono: string;


    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    // @Column({ type: 'varchar', length: 100, nullable: true })
    // ubicacion: string | null;


    @Column({ type: 'enum', enum: Tramite, default: Tramite.ALTA,})
    tramite: Tramite;

    // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
    // imagen: string | null;

    // @Column({ type: 'timestamp', nullable: true })
    // deletedAt: Date | null;
}





export enum Horario {
    LUNES_VIERNES_MATUTINO = 'Lunes a Viernes 8 AM - 12 PM',
    LUNES_VIERNES_VESPERTINO = 'Lunes a Viernes 4 PM - 8 PM',
}