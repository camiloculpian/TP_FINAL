
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Commerce } from 'src/commerces/entities/commerce.entity';
// import { Commerce } from 'src/commerce/entities/commerce.entity';

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Commerce, (commerce) => commerce.id)
    commerce: Commerce;

    @Column({ type: 'timestamp' })
    photoDate: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;
}

