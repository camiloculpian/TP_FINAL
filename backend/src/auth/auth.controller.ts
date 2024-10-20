import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    UseFilters
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from '../auth/dto/registerUser.dto'; // Asegúrate de importar el DTO de registro

import { diskStorage } from 'multer'; // Importa diskStorage desde multer
import { extname } from 'path'; 
import { HttpExceptionFilter } from './decorators/httpExceptionFilter.decorator';
import { Response, responseStatus } from '../common/responses/responses';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly i18n: I18nService
    ) { }

    @Post('register')
    @UseInterceptors(
        FileInterceptor('profilePicture', {
          storage: diskStorage({
            destination: process.env.USER_PROFILE_PICTURES_DIR,
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
      )
    async register(
        @Body() registerUserDto: RegisterUserDto,
        @UploadedFile() file,
    ) {
        try {
            return new Response({
                statusCode:201,
                status:responseStatus.OK,
                message:this.i18n.t('lang.auth.Success',{ lang:   I18nContext.current().lang }),
                data:await this.usersService.create(registerUserDto, file)
            });
        } catch (e) {
            throw e;
        }
    }

    @UseFilters(new HttpExceptionFilter())
    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto
    ) {
        try {
            console.log('Alguien solicita autorizacion...')
            return new Response({
                statusCode:201,
                status:responseStatus.OK,
                message:this.i18n.t('lang.auth.Success',{ lang:   I18nContext.current().lang }),
                data:await this.authService.login(loginUserDto)
            });
        } catch (e) {
            throw e
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async profile(
    @CurrentUser('sub') userId: number
    ) {
        try {
            return new Response({
                statusCode:201,
                status:responseStatus.OK,
                message:this.i18n.t('lang.auth.WellcomeBack',{ lang:   I18nContext.current().lang }),
                data:await this.authService.getProfile(userId)
            });
        } catch (e) {
            throw e
        }
    }

    @Get('verify')
    @UseGuards(AuthGuard)
    async verify(
    @CurrentUser('sub') userId: number
    ) {
        try {
            return new Response({
                statusCode:201,
                status:responseStatus.OK,
                message:this.i18n.t('lang.auth.WellcomeBack',{ lang:   I18nContext.current().lang }),
                data:await this.authService.getUser(userId)
            });
        } catch (e) {
            throw e
        }
    }
}
