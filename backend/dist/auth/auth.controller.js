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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const loginUser_dto_1 = require("./dto/loginUser.dto");
const auth_guard_1 = require("./auth.guard");
const currentUser_decorator_1 = require("./decorators/currentUser.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const registerUser_dto_1 = require("../auth/dto/registerUser.dto");
const multer_1 = require("multer");
const path_1 = require("path");
const httpExceptionFilter_decorator_1 = require("./decorators/httpExceptionFilter.decorator");
const responses_1 = require("../common/responses/responses");
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthController = class AuthController {
    constructor(authService, i18n) {
        this.authService = authService;
        this.i18n = i18n;
    }
    async register(registerUserDto, file) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.auth.Success', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.authService.register(registerUserDto)
            });
        }
        catch (e) {
            throw e;
        }
    }
    async login(loginUserDto) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.auth.Success', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.authService.login(loginUserDto)
            });
        }
        catch (e) {
            throw e;
        }
    }
    async profile(userId) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.auth.WellcomeBack', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.authService.getProfile(userId)
            });
        }
        catch (e) {
            throw e;
        }
    }
    async verify(userId) {
        try {
            return new responses_1.Response({
                statusCode: 201,
                status: responses_1.responseStatus.OK,
                message: this.i18n.t('lang.auth.WellcomeBack', { lang: nestjs_i18n_1.I18nContext.current().lang }),
                data: await this.authService.getUser(userId)
            });
        }
        catch (e) {
            throw e;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads-profiles/profiles',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseFilters)(new httpExceptionFilter_decorator_1.HttpExceptionFilter()),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('verify'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        nestjs_i18n_1.I18nService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map