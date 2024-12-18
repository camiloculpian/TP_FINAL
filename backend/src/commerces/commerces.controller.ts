import { Controller, Get, Post, Body, Patch, Res, Param, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';
import { Response, responseStatus } from 'src/common/responses/responses';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpStatus } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';



@Controller('commerce')
export class CommercesController {
  constructor(
    private readonly commerceService: CommercesService,
    private readonly i18n: I18nService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    // FileInterceptor('frontPicture', {
    //   storage: diskStorage({
    //     destination: process.env.COMMERCES_PICTURES_DIR,
    //     filename: (req, file, cb) => {
    //       const randomName = Array(32)
    //         .fill(null)
    //         .map(() => Math.round(Math.random() * 16).toString(16))
    //         .join('');
    //       cb(null, `${randomName}${extname(file.originalname)}`);
    //     },
    //   }),
    // }
    // ),
    ///////////////////////
    FileFieldsInterceptor(
      [
        { name: 'frontPicture', maxCount: 1 },
        { name: 'photos' },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const directory = process.env.COMMERCES_PICTURES_DIR
            cb(null, directory);
          },
          filename: (req, file, cb) => 
          {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        //TO-DO: agregar a las demas subidas de imagenes chequeo de tipos
        fileFilter: (req, file, cb) => {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type'), false);
          }
        },
      })
    ///////////////////////
  )
  async create(
    // TO-DO: si el usuario es admin, permitir crear negocios para otros usuarios...
    @CurrentUser('sub') currentUser: number,
    @Body() createCommerceDto: CreateCommerceDto,
    @UploadedFiles() files
  ) {
    try {
        return new Response({
          statusCode:201,
          status:responseStatus.OK,
          message:this.i18n.t('lang.commerce.CreateOK',{lang:   I18nContext.current().lang }),
          data: await this.commerceService.create(currentUser, createCommerceDto, files['frontPicture']? files['frontPicture'][0]:undefined, files['photos'])
        });
        
    } catch (e) {
      throw new BadRequestException({'status':'ERROR','message':e.message,'statusCode':e.statusCode});
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
    } catch (e) {
      throw new BadRequestException({'status':'ERROR','message':e.message,'statusCode':e.statusCode});
    }
  }

  @Get('pdf/:id')
  async generatePDF(@Param('id') id: number, @Res() res: ExpressResponse): Promise<void> {
    try {
      const pdfBuffer = await this.commerceService.generateCommercePDF(id);

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new BadRequestException('Error al generar el PDF');
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=comercio-${id}.pdf`,
      });

      // Enviar el buffer del PDF como respuesta
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw new BadRequestException({
        status: 'ERROR',
        message: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }
    
    

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @CurrentUser('sub') currentUser: number,
    @Param('id') id: string
  ) {
    try{
      return this.commerceService.findOne(+id);
    }catch (e){
      throw new BadRequestException({'status':'ERROR','message':e.message,'statusCode':e.statusCode});
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'frontPicture', maxCount: 1 },
        { name: 'photos' },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const directory = process.env.COMMERCES_PICTURES_DIR
            cb(null, directory);
          },
          filename: (req, file, cb) => 
          {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        //TO-DO: agregar a las demas subidas de imagenes chequeo de tipos
        fileFilter: (req, file, cb) => {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type'), false);
          }
        },
      }
    )
  )
  async update(
    @CurrentUser('sub') currentUser: number,
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateCommerceDto: UpdateCommerceDto
  ) {
    try{
      return new Response({
        statusCode:201,
        status:responseStatus.OK,
        message:this.i18n.t('lang.users.UpdateOK',{args: { id: id }, lang:   I18nContext.current().lang }),
        data: await this.commerceService.update(currentUser,+id, updateCommerceDto, files['frontPicture']? files['frontPicture'][0]:undefined, files['photos'])
      });
    }catch (e){
      throw new BadRequestException({'status':'ERROR','message':e.message,'statusCode':e.statusCode});
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @CurrentUser('sub') currentUser: number,
    @Param('id') id: string,
  ) {
    try{
      return this.commerceService.remove(+id);
    }catch (e){
      throw new BadRequestException({'status':'ERROR','message':e.message,'statusCode':e.statusCode});
    }
  }
}

