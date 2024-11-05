import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubro } from './entities/rubro.entity';
import { Response } from 'src/common/responses/responses';


@Injectable()
export class RubrosService {

  constructor(
    @InjectRepository(Rubro)
    private rubroRepository: Repository<Rubro>,
  ) { }
  
  async create(createRubroDto: CreateRubroDto): Promise<Rubro> {
    try {
      return await this.rubroRepository.save({...createRubroDto});
    } catch (e) {
      throw e;
    }
  }


  // findAll() {
  //   return `This action returns all rubro`;
  // }

  async findAll(): Promise<Rubro[]> {
    return await this.rubroRepository.find();
  }
  
  async findOne(id: number) {
    return await this.rubroRepository.findOne({ where: {id: id} });
  }

  update(id: number, updateRubroDto: UpdateRubroDto) {
    return `This action updates a #${id} rubro`;
  }

  remove(id: number) {
    return `This action removes a #${id} rubro`;
  }
}
