import { Module } from '@nestjs/common';
import { OlaModule } from './ola/ola.module';

@Module({
    imports:[OlaModule]
})
export class AppModule {}
