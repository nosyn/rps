import { Module } from '@nestjs/common';
import { ReferenceSourceService } from './reference-source.service';
import { ReferenceSourceController } from './reference-source.controller';

@Module({
  controllers: [ReferenceSourceController],
  providers: [ReferenceSourceService],
})
export class ReferenceSourceModule {}
