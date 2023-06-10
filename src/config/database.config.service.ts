import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";
import { ExamesEntity } from 'src/exame/exame.entity';
import { LaboratorioEntity } from 'src/laboratorio/laboratorio.entity';
import { RequisicaoExameEntity } from 'src/requisicaoExame/requisicaoExame.entity';
import { RespostaRequisicaoEntity } from 'src/respostaRequisicao/respostaRequisicao.entity';
import { TipoUsuarioEntity } from 'src/tipoUsuario/tipoUsuario.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory{

    constructor(private configService: ConfigService){}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return{
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            timezone: 'America/Sao_Paulo',
            entities: [UsuarioEntity, TipoUsuarioEntity, RequisicaoExameEntity, ExamesEntity, LaboratorioEntity, RespostaRequisicaoEntity],
            synchronize: true,
        }
    }

}