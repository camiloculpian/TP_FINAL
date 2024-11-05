import { Module } from '@nestjs/common';
import { RubrosController } from './rubros.controller';
import { RubrosService } from './rubros.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubro } from './entities/rubro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rubro])],
  controllers: [RubrosController],
  providers: [RubrosService, TypeOrmModule],
  exports: [RubrosService]
})
export class RubrosModule {}
