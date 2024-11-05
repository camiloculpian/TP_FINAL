import { Commerce } from 'src/commerces/entities/commerce.entity';
import { Role } from '../../auth/enums/role.enum';
import { Column, DeleteDateColumn, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.CONTRIB,
    })
    roles: Role;

    @Column({ unique: false, nullable: false })
    name: string;

    @Column({ unique: false, nullable: false })
    lastName: string;

    @Column({ unique: true, nullable: false })
    dni: string;

    @Column({ unique: false, nullable: false })
    address: string;

    @Column({ unique: false, nullable: true })
    phone: string;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @OneToMany(() => Commerce, (commerce) => commerce.contrib) // note: we will create contrib property in the Commerce class
    commerce: Commerce[]

    @Column({ nullable: true, default:null })
    profilePicture: string;
}
