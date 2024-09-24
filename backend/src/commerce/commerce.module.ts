import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';

@Module({
  controllers: [CommerceController],
  providers: [CommerceService],
})
export class CommerceModule {}
