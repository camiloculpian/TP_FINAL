import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { Response } from '../common/responses/responses';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly i18n;
    constructor(authService: AuthService, usersService: UsersService, i18n: I18nService);
    register(registerUserDto: RegisterUserDto, file: any): Promise<Response>;
    login(loginUserDto: LoginUserDto): Promise<Response>;
    profile(userId: number): Promise<Response>;
    verify(userId: number): Promise<Response>;
}
