import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Commerce, Tramite } from './entities/commerce.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Rubro } from 'src/rubros/entities/rubro.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { PhotosService } from 'src/photos/photos.service';


@Injectable()
export class CommercesService {

  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
    private photosService: PhotosService,
    private usersService: UsersService,
    private dataSource: DataSource
  ) { }
  
  async create(currenrUser: number, createCommerceDto: CreateCommerceDto, frontPicture?: Express.Multer.File, photos?: Express.Multer.File[] ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if(frontPicture){
        createCommerceDto.frontPicture = frontPicture.filename;
      }
      const contrib = await this.usersService.findOne(currenrUser);
      const commerceDto = this.commerceRepository.create(
        {
          ...createCommerceDto,
          contrib,
        }
      );
      const commerce = await this.commerceRepository.save({...commerceDto});
      if(photos){
        const phot = await this.photosService.create(photos, commerce);
      }
      await queryRunner.commitTransaction();
      return commerce
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }
  }


  // findAll() {
  //   return `This action returns all commerce`;
  // }

  async findAll(currentUser: number) {
    try{
      //TO-DO: si es admin deberia retornar todos los negocios o permitir buscar por id - PARA MAS ADELANTE
      const contrib = await this.usersService.findOne(currentUser);
      return await this.commerceRepository.find(
        {
          where: {contrib: contrib},
          relations: {rubros: true,photos:true}
        }
      )
    }catch(e){
      throw(e);
    }
  }
  
  async findOne(id: number) {
    return `This action returns a #${id} commerce`;
  }

  async update(currenrUser: number, commerceId: number, updateCommerceDto: UpdateCommerceDto, frontPicture?: Express.Multer.File, photos?: Express.Multer.File[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if(photos){
        console.log(photos);
        // TO-DO: Borrar las fotos actuales en photos
        // TO-DO: Insertar las fotos en photos
        // updateCommerceDto.photos = photos;
      }      
        // TO-DO: en el registro lo hace en el controller y en la modificacion aca, unificar criterios...
        
        
        //updateCommerceDto.photos = 
      const curentCommerce = await this.commerceRepository.findOneBy({id:commerceId});
      const updateCommerce = {
        id: curentCommerce.id,
        // contrib: curentCommerce.contrib, // Tengo que decirle que me traiga el contribuyente
        frontPicture: curentCommerce.frontPicture,
        nombre:  updateCommerceDto.nombre,
        descripcion: updateCommerceDto.descripcion,
        correo: updateCommerceDto.correo,
        telefono: updateCommerceDto.telefono,
        direccion: updateCommerceDto.direccion,
      }
      if (frontPicture) {
        updateCommerce.frontPicture = frontPicture.filename;
        const fs = require('fs')
        try {
          fs.unlinkSync(process.env.COMMERCES_PICTURES_DIR+curentCommerce.frontPicture);
          console.log('profilePicture removed: '+process.env.COMMERCES_PICTURES_DIR+curentCommerce.frontPicture)
        } catch(err) {
          console.error('Something wrong happened removing the profilepicture', err)
        }
      }
      console.log(updateCommerce)
      const contrib = await this.usersService.findOne(currenrUser);
      const commerce = await this.commerceRepository.save({...curentCommerce,...updateCommerce});
      // const commerce = await this.commerceRepository.save({...curentCommerceData});
      await queryRunner.commitTransaction();
      return commerce
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} commerce`;
  }
}
