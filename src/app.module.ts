import { Module } from '@nestjs/common';
import { OlaController } from './ola/ola.controller';
import { OlaService } from './ola/ola.service';

@Module({
  imports: [],
  controllers: [OlaController],
  providers: [OlaService],
})
export class AppModule {}
