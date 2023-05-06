import { Module } from '@nestjs/common';
import { OlaModule } from './ola/ola.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        OlaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
            inject: [DatabaseConfigService]
        }),
    ]
})
export class AppModule {}
