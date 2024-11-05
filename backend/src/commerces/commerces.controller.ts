import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';
import { Commerce } from './entities/commerce.entity';
import { Response, responseStatus } from 'src/common/responses/responses';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Controller('commerce')
export class CommercesController {
  constructor(
    private readonly commerceService: CommercesService,
    private readonly i18n: I18nService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    // TO-DO: si el usuario es admin, permitir crear negocios para otros usuarios...
    @CurrentUser('sub') currentUser: number,
    @Body() createCommerceDto: CreateCommerceDto
  ) {
    try {
        return new Response({
          statusCode:201,
          status:responseStatus.OK,
          message:this.i18n.t('lang.commerce.CreateOK',{lang:   I18nContext.current().lang }),
          data: await this.commerceService.create(currentUser, createCommerceDto)
        });
        
    } catch (error) {
        throw new BadRequestException('Error al crear el comercio: ' + error.message);
    }
  }

  // TO-DO: aca solo deve devolver los del usuario!!!
  // Hecho lo anterior, mas adelante tener en cuenta que un admin puede necesitar ver los de otro usuario
  // Pasar dicho usuario por parametro opcional y tirar un eERROR si quien lo pide no tiene permisos de admin
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @CurrentUser('sub') currentUser: number
  ){
    try {
      return new Response({
        statusCode:201,
        status:responseStatus.OK,
        message:this.i18n.t('lang.commerce.FindAllOK',{lang:   I18nContext.current().lang }),
        data: await this.commerceService.findAll(currentUser)
      });
      
  } catch (error) {
      throw new BadRequestException('Error al devolver los comercios: ' + error.message);
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

