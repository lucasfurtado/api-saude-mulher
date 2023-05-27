import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { RequisicaoExameController } from "./requisicaoExame.controller";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { RequisicaoExameService } from "./requisicaoExame.service";

@Module({
    imports: [TypeOrmModule.forFeature([RequisicaoExameEntity]),TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [RequisicaoExameController],
    providers: [RequisicaoExameService],
    exports: [RequisicaoExameService]
})
export class RequisicaoExameModule{}