import { UsuarioModule } from './usuario/usuario.module';
import { Module } from '@nestjs/common';
import { OlaModule } from './ola/ola.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TipoUsuarioModule } from './tipoUsuario/tipoUsuario.module';
import { RequisicaoExameModule } from './requisicaoExame/requisicaoExame.module';

@Module({
    imports:[
        OlaModule,
        UsuarioModule,
        AuthModule,
        TipoUsuarioModule,
        RequisicaoExameModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
            inject: [DatabaseConfigService]
        }),
    ],
})
export class AppModule {}
