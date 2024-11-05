import { Commerce } from 'src/commerces/entities/commerce.entity';
import { Role } from '../../auth/enums/role.enum';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role;
    name: string;
    lastName: string;
    dni: string;
    address: string;
    phone: string;
    deletedAt: Date;
    commerce: Commerce[];
    profilePicture: string;
}
