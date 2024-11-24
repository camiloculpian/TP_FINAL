import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum NotificationState {
    // ENVIADA A CADA CONTRIBUYENTE
    DELIVERED = "delivered",
    // RECIBIDA POR EL CONTRIBUYENTE PENDIENTE DE QUE EL CONTRIBUYENTE LA LEA
    RECEIVED = "received",
    // NOTIFICACIÓN LEIDA POR EL CONTRIBUYENTE
    READED = "readed",
    CANCELED = "cancelled",
    REJECTED = "rejected",
}

@Entity('notification')
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: NotificationState, default: NotificationState.DELIVERED, nullable:false })
    state: NotificationState;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    receivedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    readedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @ManyToOne(() => User, (sender) => sender.id)
    sender: User;

    @ManyToOne(() => User, (receiver) => receiver.id)
    receiver: User;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    subject: string;

    @Column({ type: 'text', nullable: true })
    message: string;

}