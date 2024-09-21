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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const responses_1 = require("../common/responses/responses");
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthService = class AuthService {
    constructor(usersServive, jwtService, i18n) {
        this.usersServive = usersServive;
        this.jwtService = jwtService;
        this.i18n = i18n;
    }
    async register(registerUserDto) {
        try {
            const existingUserByUsername = await this.usersServive.findOneByUsername(registerUserDto.username);
            const existingUserByDNI = await this.usersServive.findOneByDNI(registerUserDto.dni);
            const existingUserByEmail = await this.usersServive.findOneByEmail(registerUserDto.email);
            if (existingUserByUsername) {
                throw new common_1.BadRequestException(this.i18n.t('lang.auth.UsernameError', { lang: nestjs_i18n_1.I18nContext.current().lang }));
            }
            if (existingUserByDNI) {
                throw new common_1.BadRequestException(this.i18n.t('lang.auth.DNIError', { lang: nestjs_i18n_1.I18nContext.current().lang }));
            }
            if (existingUserByEmail) {
                throw new common_1.BadRequestException(this.i18n.t('lang.auth.mailError', { lang: nestjs_i18n_1.I18nContext.current().lang }));
            }
            return await this.usersServive.create(registerUserDto);
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
    }
    async login(loginUserDto) {
        try {
            let user = await this.usersServive.findOneByUsernameAndPasswd(loginUserDto.username, loginUserDto.password);
            if (!user) {
                let userBy = await this.usersServive.findOneByEmail(loginUserDto.username);
                if (userBy) {
                    user = await this.usersServive.findOneByUsernameAndPasswd(userBy?.username, loginUserDto.password);
                }
                else {
                    userBy = await this.usersServive.findOneByDNI(loginUserDto.username);
                    if (userBy) {
                        user = await this.usersServive.findOneByUsernameAndPasswd(userBy?.username, loginUserDto.password);
                    }
                }
            }
            if (user) {
                const payload = { sub: user.id };
                if (loginUserDto?.keepSessionOpen) {
                    console.log('KEEP SESSION OPEN PASSEED!!!');
                }
                const token = loginUserDto?.keepSessionOpen ? await this.jwtService.signAsync(payload) : await this.jwtService.signAsync(payload);
                return {
                    nombre: user.name + ' ' + user.lastName,
                    username: user.username,
                    roles: user.roles,
                    token: token,
                };
            }
            else {
                throw new common_1.UnauthorizedException({ status: responses_1.responseStatus.UNAUTH, message: this.i18n.t('lang.auth.WrongLogin', { lang: nestjs_i18n_1.I18nContext.current().lang }) });
            }
        }
        catch (e) {
            console.log(e);
            if (e instanceof common_1.BadRequestException || e instanceof common_1.UnauthorizedException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
    }
    async getProfile(userId) {
        try {
            return await this.usersServive.findOne(userId);
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException || e instanceof common_1.UnauthorizedException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
    }
    async getUser(userId) {
        try {
            const payload = { sub: userId };
            const token = await this.jwtService.signAsync(payload);
            let user = await this.usersServive.findOne(userId);
            return {
                nombre: user.name + ' ' + user.lastName,
                username: user.username,
                roles: user.roles,
                token: token,
            };
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException || e instanceof common_1.UnauthorizedException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        nestjs_i18n_1.I18nService])
], AuthService);
//# sourceMappingURL=auth.service.js.map