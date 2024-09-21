"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
config_1.ConfigModule.forRoot({
    envFilePath: 'src/config/database.env',
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: () => ({
                    fallbackLanguage: 'es-AR',
                    loaderOptions: {
                        path: (0, path_1.join)(__dirname, '/i18n/'),
                        watch: true,
                    },
                    typesOutputPath: (0, path_1.join)(__dirname, '../src/generated/i18n.generated.ts'),
                }),
                resolvers: [new nestjs_i18n_1.HeaderResolver(['x-custom-lang'])],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../'),
                renderPath: 'api/v1/uploads',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map