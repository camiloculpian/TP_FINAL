"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const auth_guard_1 = require("../auth/auth.guard");
const path_1 = require("path");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const currentUser_decorator_1 = require("../auth/decorators/currentUser.decorator");
const nestjs_i18n_1 = require("nestjs-i18n");
const responses_1 = require("../common/responses/responses");
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    envFilePath: 'src/config/config.env',
});
let UsersController = class UsersController {
    constructor(usersService, i18n) {
        this.usersService = usersService;
        this.i18n = i18n;
    }
    async create(createUserDto, file) {
        try {
            if (file) {
                createUserDto.profilePicture = file.filename;
            }
            const data = await this.usersService.create(createUserDto);
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.CreateOK', { args: { id: data.id }, lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: data
            });
        }
        catch (error) {
            console.error('Error al crear usuario:', error);
            throw new common_1.BadRequestException({ 'status': 'ERROR', 'message': error.message, 'statusCode': error.statusCode });
        }
    }
    async findAll(userId) {
        try {
            const users = await this.usersService.findAll(userId);
            return new responses_1.Response({
                statusCode: 200,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.ReadOK', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: users,
            });
        }
        catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw new common_1.BadRequestException({
                'status': 'ERROR',
                'message': error.message,
                'statusCode': error.statusCode,
            });
        }
    }
    async getProfile(userId) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.ReadOK', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.usersService.findOne(+userId)
            });
        }
        catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw new common_1.BadRequestException({ 'status': 'ERROR', 'message': error.message, 'statusCode': error.statusCode });
        }
    }
    async findOne(id) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.ReadOK', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.usersService.findOne(+id)
            });
        }
        catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw new common_1.BadRequestException({ 'status': 'ERROR', 'message': error.message, 'statusCode': error.statusCode });
        }
    }
    async update(id, updateUserDto, currentUser, file) {
        try {
            console.log('file: ' + file);
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.UpdateOK', { args: { id: id }, lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.usersService.update(id, updateUserDto, currentUser, file)
            });
        }
        catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new common_1.BadRequestException({ 'status': 'ERROR', 'message': error.message, 'statusCode': error.statusCode });
        }
    }
    async remove(id) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.users.DeleteOK', { args: { id: id }, lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.usersService.remove(id)
            });
        }
        catch (e) {
            console.error('Error al eliminar usuario:', e);
            throw new common_1.BadRequestException({ 'status': 'ERROR', 'message': e.message, 'statusCode': e.statusCode });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture', {
        storage: (0, multer_1.diskStorage)({
            destination: process.env.USER_PROFILE_PICTURES_DIR,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture', {
        storage: (0, multer_1.diskStorage)({
            destination: process.env.USER_PROFILE_PICTURES_DIR,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, currentUser_decorator_1.CurrentUser)('sub')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        nestjs_i18n_1.I18nService])
], UsersController);
//# sourceMappingURL=users.controller.js.map