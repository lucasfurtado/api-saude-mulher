import { UsuarioModule } from './usuario/usuario.module';
import { Module } from '@nestjs/common';
import { OlaModule } from './ola/ola.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TipoUsuarioModule } from './tipoUsuario/tipoUsuario.module';
import { RequisicaoExameModule } from './requisicaoExame/requisicaoExame.module';
import { ExameModule } from './exame/exame.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { RespostaRequisicaoModule } from './respostaRequisicao/respostaRequisicao.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports:[
        OlaModule,
        UsuarioModule,
        AuthModule,
        TipoUsuarioModule,
        RequisicaoExameModule,
        ExameModule,
        LaboratorioModule,
        RespostaRequisicaoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
            inject: [DatabaseConfigService]
        }),
        MulterModule.register({
            dest: './uploads', // Pasta de destino para salvar os arquivos
        }),
    ],
})
export class AppModule {}
