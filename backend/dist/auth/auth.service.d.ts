import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private readonly usersServive;
    private readonly jwtService;
    private readonly i18n;
    constructor(usersServive: UsersService, jwtService: JwtService, i18n: I18nService);
    register(registerUserDto: RegisterUserDto): Promise<{
        username: string;
        email: string;
        password: string;
        roles?: import("./enums/role.enum").Role;
        name: string;
        lastName: string;
        dni: string;
        address: string;
        phone: string;
        profilePicture?: string;
    } & User>;
    validateUser(username: string, password: string): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        nombre: string;
        username: string;
        roles: import("./enums/role.enum").Role;
        token: string;
    }>;
    getProfile(userId: number): Promise<User>;
    getUser(userId: number): Promise<{
        nombre: string;
        username: string;
        roles: import("./enums/role.enum").Role;
        token: string;
    }>;
}
