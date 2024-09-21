import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { Response } from '../common/responses/responses';
import { I18nService } from 'nestjs-i18n';
export declare class AuthController {
    private readonly authService;
    private readonly i18n;
    constructor(authService: AuthService, i18n: I18nService);
    register(registerUserDto: RegisterUserDto, file: Express.Multer.File): Promise<Response>;
    login(loginUserDto: LoginUserDto): Promise<Response>;
    profile(userId: number): Promise<Response>;
    verify(userId: number): Promise<Response>;
}
