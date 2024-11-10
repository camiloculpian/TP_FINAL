
import { Photo } from 'src/photos/entities/photo.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';

export enum Tramite {
    ALTA = 'Alta',
    ACTUALIZACION = 'Actualización',
    BAJA = 'Baja'
}

@Entity('commerce')
export class Commerce {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, (user) => user.id)
    contrib: User

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    // TO-DO: ver como pongo la foto principal, tal vez convenga ponerla directamente y no como una relacion
    @Column({nullable: true})
    frontPicture?: string;

    @Column({nullable: true})
    descripcion: string;

    // @Column({ type: 'enum', enum: Rubro })
    // rubro: Rubro;
    @ManyToMany(() => Rubro, (rubro) => rubro.id)
    @JoinTable({
        name: 'commerce_rubro',
        joinColumn: { name: 'commerceId' },
        inverseJoinColumn: { name: 'rubroId' }
      })
    rubros: Rubro[];

    @Column({ type: 'varchar', length: 100 })
    correo: string;

    @Column({ type: 'varchar', length: 20 })
    telefono: string;

    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    // Una lista con fotos del local
   // @OneToMany(()=> Photo, (photo) => photo.id)
   // commerce: Photo;

    // Una lista con fotos del local
    // IMPLEMENTAR
    @OneToMany(() => Photo, (photo) => photo.commerce, { cascade: true })
    photos: Photo[];

    @Column({ type: 'varchar', length: 100, nullable: true })
    ubicacion: string;

    @Column({ type: 'enum', enum: Tramite, default: Tramite.ALTA,})
    tramite: Tramite;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;
}

export enum Horario {
    LUNES_VIERNES_MATUTINO = 'Lunes a Viernes 8 AM - 12 PM',
    LUNES_VIERNES_VESPERTINO = 'Lunes a Viernes 4 PM - 8 PM',
}