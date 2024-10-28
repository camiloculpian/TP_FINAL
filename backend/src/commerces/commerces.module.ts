import { Module } from '@nestjs/common';
import { CommercesController } from './commerces.controller';
import { CommercesService } from './commerces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  controllers: [CommercesController],
  providers: [CommercesService]
})
export class CommercesModule {}
