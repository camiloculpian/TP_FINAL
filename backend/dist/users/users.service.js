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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const role_enum_1 = require("../auth/enums/role.enum");
const responses_1 = require("../common/responses/responses");
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    envFilePath: 'src/config/config.env',
});
let UsersService = class UsersService {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async create(createUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingUserByEmail = await this.userRepository.findOne({
                where: { email: createUserDto.email },
            });
            if (existingUserByEmail) {
                throw new common_2.BadRequestException('**ERROR: User with email already exists');
            }
            if (createUserDto.dni) {
                const existingPersonByDNI = await this.userRepository.findOne({
                    where: { dni: createUserDto.dni },
                });
                if (existingPersonByDNI) {
                    throw new common_2.BadRequestException('**ERROR: Person with DNI already exists');
                }
            }
            const user = await this.userRepository.save({ ...createUserDto });
            await queryRunner.commitTransaction();
            return user;
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            console.log(e.message);
            if (e instanceof common_2.BadRequestException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(userId) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_2.NotFoundException(`User with ID ${userId} not found`);
            }
            if (user.roles.includes(role_enum_1.Role.ADMIN)) {
                return this.userRepository.find({});
            }
            else {
                return [user];
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({
                status: responses_1.responseStatus.ERROR,
                message: e.message,
            });
        }
    }
    async findOne(id) {
        try {
            return await this.userRepository.findOne({
                where: {
                    id: id
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async findOneByUsernameAndPasswd(username, password) {
        try {
            return await this.userRepository.findOne({
                where: {
                    username: username,
                    password: password
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async findOneByUsername(username) {
        try {
            return await this.userRepository.findOne({
                where: {
                    username: username,
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userRepository.findOne({
                where: {
                    email: email
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async findOneByDNI(dni) {
        try {
            return await this.userRepository.findOne({
                where: {
                    dni: dni
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async update(id, updateUserDto, currentUser, file) {
        const user = await this.userRepository.findOne({ where: {
                id: currentUser
            } });
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const userToUpdate = await this.userRepository.findOne({
                where: { id: id },
            });
            if (!userToUpdate) {
                throw new common_2.NotFoundException('Usuario no encontrado');
            }
            const isAdmin = user.roles === role_enum_1.Role.ADMIN;
            const isCurrentUser = user.id === id;
            if (file) {
                const fs = require('fs');
                try {
                    fs.unlinkSync(process.env.USER_PROFILE_PICTURES_DIR + updateUserDto.profilePicture);
                    console.log('profilePicture removed: ' + process.env.USER_PROFILE_PICTURES_DIR + updateUserDto.profilePicture);
                }
                catch (err) {
                    console.error('Something wrong happened removing the profilepicture', err);
                }
                updateUserDto.profilePicture = file.filename;
            }
            if (!isAdmin && !isCurrentUser) {
                throw new common_2.ForbiddenException('No tienes permiso para modificar este usuario');
            }
            if (!isAdmin && isCurrentUser) {
                if (updateUserDto.username || updateUserDto.password || updateUserDto.profilePicture || updateUserDto.email || updateUserDto.phone) {
                    updateUserDto = {
                        username: updateUserDto.username,
                        password: updateUserDto.password,
                        profilePicture: updateUserDto.profilePicture,
                        email: updateUserDto.email,
                        phone: updateUserDto.phone,
                    };
                }
                else {
                    throw new common_2.ForbiddenException('No tienes permiso para modificar este campo');
                }
            }
            await this.userRepository.save({ ...userToUpdate, ...updateUserDto });
            await queryRunner.commitTransaction();
            return { status: 'OK', message: 'Los datos del usuario se actualizaron correctamente' };
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            console.log(e.message);
            if (e instanceof common_2.BadRequestException || e instanceof common_1.UnauthorizedException) {
                throw e;
            }
            else {
                throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        try {
            return await this.userRepository.softDelete(id);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
    async getRolesById(id) {
        try {
            return await this.userRepository.findOne({
                where: {
                    id: id
                },
                select: {
                    roles: true,
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException({ status: responses_1.responseStatus.ERROR, message: e.message });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map