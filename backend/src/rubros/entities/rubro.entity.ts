import { Commerce } from 'src/commerces/entities/commerce.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity('rubro')
export class Rubro {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Commerce, (commerce) => commerce.id)
    commerces: Commerce[];

    @Column({ type: 'varchar', length: 255 })
    codigo: string;

    @Column({ type: 'varchar', length: 255 })
    descripcion: string;

    @Column({ type: 'varchar', length: 255 })
    descripcion_l: string;

}