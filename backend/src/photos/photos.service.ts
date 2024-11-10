import { Injectable } from '@nestjs/common';
import { UpdatePhotoDto } from './dto/update-photo.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  //   async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
  //     const photo = this.photoRepository.create(createPhotoDto);
  //    return await this.photoRepository.save(photo);
  //  }

  async create(
    files: Array<Express.Multer.File>,
    createPhotoDto,
  ): Promise<Photo[]> {
    const photos = files.map((file) => {
      const photo = new Photo();
      photo.commerce = createPhotoDto.commerce;
      photo.photoDate = new Date();
      return photo;
    });
    return await this.photoRepository.save(photos);
  }

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  // reveer id tipo number, tira error...
  async findOne(id): Promise<Photo> {
    return await this.photoRepository.findOne(id);
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    await this.photoRepository.update(id, updatePhotoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}

// @Injectable()
// export class PhotosService {
//   create(createPhotoDto: CreatePhotoDto) {
//     return 'This action adds a new photo';
//   }

//   findAll() {
//     return `This action returns all photos`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} photo`;
//   }

//   update(id: number, updatePhotoDto: UpdatePhotoDto) {
//     return `This action updates a #${id} photo`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} photo`;
//   }
// }
