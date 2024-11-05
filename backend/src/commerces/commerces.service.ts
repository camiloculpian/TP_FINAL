import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commerce, Tramite } from './entities/commerce.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class CommercesService {

  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
    private usersService: UsersService
  ) { }
  
  async create(currenrUser: number, createCommerceDto: CreateCommerceDto) {
    try {
      const contrib = await this.usersService.findOne(currenrUser);
      const comerceDto = this.commerceRepository.create(
        {
          ...createCommerceDto,
          contrib,
        }
      );
      return await this.commerceRepository.save({...comerceDto});
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar en la base de datos: ' + error.message);
    }
  }


  // findAll() {
  //   return `This action returns all commerce`;
  // }

  async findAll(currentUser: number) {
    try{
      //TO-DO: si es admin deberia retornar todos los negocios o permitir buscar por id - PARA MAS ADELANTE
      const contrib = await this.usersService.findOne(currentUser);
      return await this.commerceRepository.find({where: {contrib: contrib}})
    }catch(e){
      throw(e);
    }
    return await this.commerceRepository.find();
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
