
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Commerce } from 'src/commerces/entities/commerce.entity';
// import { Commerce } from 'src/commerce/entities/commerce.entity';

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Commerce, (commerce) => commerce.photos)
    commerce: Commerce;

    @Column({ type: 'timestamp', nullable: true })
    photoDate: Date;

    //@Column()
   // url: string;  
    // Cuando la borramos la marcamos como borrada y la borramos del server tamnien? o la borramos de la DB (lo ultimo seria lo mejor)
    // @DeleteDateColumn({ select: false })
    // deletedAt: Date;
}

