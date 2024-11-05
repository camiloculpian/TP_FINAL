import { Module } from '@nestjs/common';
import { CommercesController } from './commerces.controller';
import { CommercesService } from './commerces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { RubrosModule } from 'src/rubros/rubros.module';

@Module({
  imports: [RubrosModule, TypeOrmModule.forFeature([Commerce])],
  controllers: [CommercesController],
  providers: [CommercesService, TypeOrmModule]
})
export class CommercesModule {}
