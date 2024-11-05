

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo } from './entities/photo.entity';
import { CommercesModule } from 'src/commerces/commerces.module';

@Module({
  imports: [CommercesModule, TypeOrmModule.forFeature([Photo])],
  controllers: [PhotosController],
  providers: [PhotosService, TypeOrmModule],
})
export class PhotosModule {}
