import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';
import { RubrosModule } from './rubros/rubros.module';
import { CommercesModule } from './commerces/commerces.module';


ConfigModule.forRoot({
  envFilePath: 'src/config/database.env',
});
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'es-AR',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      }),
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
      renderPath: 'api/v1/uploads',
    }),
    UsersModule,
    AuthModule,
    
    CommercesModule,
    
    PhotosModule,
    
    RubrosModule,
    
    CommercesModule,
    
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
