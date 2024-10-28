import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';
import { Commerce } from './entities/commerce.entity';

@Controller('commerce')
export class CommercesController {
  constructor(private readonly commerceService: CommercesService) {}

  @Post()
    async create(@Body() createCommerceDto: CreateCommerceDto) {
        try {
            console.log('Exito al guardar comercio controller')
            return await this.commerceService.create(createCommerceDto);
            
        } catch (error) {
            throw new BadRequestException('Error al crear el comercio controller: ' + error.message);
        }
    }

  @Get()
  // findAll() {
  //   return this.commerceService.findAll();
  // }

  async findAll(): Promise<Commerce[]> {
    return this.commerceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commerceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommerceDto: UpdateCommerceDto) {
    return this.commerceService.update(+id, updateCommerceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commerceService.remove(+id);
  }
}

