import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { I18nService } from 'nestjs-i18n';
import { Response } from '../common/responses/responses';
export declare class UsersController {
    private readonly usersService;
    private readonly i18n;
    constructor(usersService: UsersService, i18n: I18nService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<Response>;
    findAll(userId: number): Promise<Response>;
    getProfile(userId: number): Promise<Response>;
    findOne(id: number): Promise<Response>;
    update(id: number, updateUserDto: UpdateUserDto, currentUser: number, file: any): Promise<Response>;
    remove(id: number): Promise<Response>;
}
