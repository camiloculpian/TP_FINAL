

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService, TypeOrmModule],  // To be able to use the service in other modules, this needs to be exported.  // Also, TypeOrmModule is needed to use TypeORM in this module.  // TypeOrmModule.forFeature([Photo]) imports the Photo entity from the entities folder.  // PhotosService is a provider, it is a service that is available to be injected into other services and controllers.  // PhotosController is a controller, it is
})
export class PhotosModule { }
