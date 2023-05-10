import { Module } from '@nestjs/common';
import { TessController } from './tess.controller';

@Module({
  controllers: [TessController]
})
export class TessModule {}
