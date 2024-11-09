import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Commerce, Tramite } from './entities/commerce.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class CommercesService {

  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
    private usersService: UsersService,
    private dataSource: DataSource
  ) { }
  
  async create(currenrUser: number, createCommerceDto: CreateCommerceDto, frontPicture?: Express.Multer.File ) {
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
          relations: {rubros: true,}
        }
      )
    }catch(e){
      throw(e);
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} commerce`;
  }

  update(id: number, updateCommerceDto: UpdateCommerceDto) {
    return `This action updates a #${id} commerce`;
  }

  remove(id: number) {
    return `This action removes a #${id} commerce`;
  }
}
