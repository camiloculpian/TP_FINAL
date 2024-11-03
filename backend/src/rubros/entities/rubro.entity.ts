import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('rubro')
export class Rubro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    codigo: string;

    @Column({ type: 'varchar', length: 255 })
    descripcion: string;

    @Column({ type: 'varchar', length: 255 })
    descripcion_l: string;

}