import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commerce, Tramite } from './entities/commerce.entity';


@Injectable()
export class CommercesService {

  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
  ) { }
  
  async create(createCommerceDto: CreateCommerceDto) {
    try {
      return await this.commerceRepository.save({...createCommerceDto});;
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar en la base de datos: ' + error.message);
    }
  }


  // findAll() {
  //   return `This action returns all commerce`;
  // }

  async findAll() {
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
