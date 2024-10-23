
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Commerce } from 'src/commerce/entities/commerce.entity';

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id_photo: number;

    // @Column()
    // id_user: number;

    // @Column()
    // id: number;

    // @Column({ type: 'timestamp' })
    // fecha_photo: Date;

    // @ManyToOne(() => User, user => user.photos)
    // user: User;

    // @ManyToOne(() => Commerce, commerce => commerce.photos)
    // commerce: Commerce;
}

