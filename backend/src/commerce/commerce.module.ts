import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { Commerce } from './entities/commerce.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  controllers: [CommerceController],
  providers: [CommerceService],
})
export class CommerceModule {}
