import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';
import { Commerce } from './entities/commerce.entity';
import { Response, responseStatus } from 'src/common/responses/responses';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Controller('commerce')
export class CommercesController {
  constructor(
    private readonly commerceService: CommercesService,
    private readonly i18n: I18nService
  ) {}

  @Post()
  async create(@Body() createCommerceDto: CreateCommerceDto) {
    try {
        return new Response({
          statusCode:201,
          status:responseStatus.OK,
          message:this.i18n.t('lang.commerce.CreateOK',{lang:   I18nContext.current().lang }),
          data: await this.commerceService.create(createCommerceDto)
        });
        
    } catch (error) {
        throw new BadRequestException('Error al crear el comercio: ' + error.message);
    }
  }

  // TO-DO: aca solo deve devolver los del usuario!!!
  @Get()
  async findAll(){
    try {
      return new Response({
        statusCode:201,
        status:responseStatus.OK,
        message:this.i18n.t('lang.commerce.FindAllOK',{lang:   I18nContext.current().lang }),
        data: await this.commerceService.findAll()
      });
      
  } catch (error) {
      throw new BadRequestException('Error al crear el comercio: ' + error.message);
  }
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

