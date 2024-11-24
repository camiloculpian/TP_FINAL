import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  //@Post()
 // async create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
 //   return this.photosService.create(createPhotoDto);
  //}
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('photos')) 
  async uploadPhotos(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createPhotoDto,
  ): Promise<Photo[]> {
    return this.photosService.create(files, createPhotoDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photosService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Photo> {
    return this.photosService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    return this.photosService.update(+id, updatePhotoDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.photosService.remove(+id);
  }
}
