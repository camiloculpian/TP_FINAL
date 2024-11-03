import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { Rubro } from './entities/rubro.entity';
import { Response, responseStatus } from 'src/common/responses/responses';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Controller('rubro')
export class RubrosController {
  constructor(
    private readonly rubroService: RubrosService,
    private readonly i18n: I18nService
  ) {}

  @Post()
    async create(@Body() createRubroDto: CreateRubroDto) {
        try {
            console.log('Exito al guardar comercio controller')
            return new Response({
              statusCode:201,
              status:responseStatus.OK,
              message:this.i18n.t('lang.createRubro.Success',{ lang:   I18nContext.current().lang }),
              data:await this.rubroService.create(createRubroDto)
            });            
        } catch (error) {
            throw new BadRequestException('Error al crear el comercio controller: ' + error.message);
        }
    }

  @Get()
  async findAll() {
    try{
      return new Response({
        statusCode:201,
        status:responseStatus.OK,
        message:this.i18n.t('lang.findRubro.Success',{ lang:   I18nContext.current().lang }),
        data:await this.rubroService.findAll()
      });  
    }catch(e){
      throw e;
    }
    
  }
   // findAll() {
  //   return this.rubroService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rubroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRubroDto: UpdateRubroDto) {
    return this.rubroService.update(+id, updateRubroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rubroService.remove(+id);
  }
}