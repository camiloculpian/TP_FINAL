import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../auth/enums/role.enum';
export declare class UsersService {
    private readonly userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(createUserDto: CreateUserDto): Promise<{
        username: string;
        email: string;
        password: string;
        roles?: Role;
        name: string;
        lastName: string;
        dni: string;
        address: string;
        phone: string;
        profilePicture?: string;
    } & User>;
    findAll(userId: number): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsernameAndPasswd(username: string, password: string): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByDNI(dni: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto, currentUser: number, file: Express.Multer.File): Promise<{
        status: string;
        message: string;
    }>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    private getRolesById;
}
