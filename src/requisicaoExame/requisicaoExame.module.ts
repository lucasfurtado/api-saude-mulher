import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { RequisicaoExameController } from "./requisicaoExame.controller";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { RequisicaoExameService } from "./requisicaoExame.service";
import { RespostaRequisicaoEntity } from "src/respostaRequisicao/respostaRequisicao.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RequisicaoExameEntity]),TypeOrmModule.forFeature([UsuarioEntity]),TypeOrmModule.forFeature([RespostaRequisicaoEntity])],
    controllers: [RequisicaoExameController],
    providers: [RequisicaoExameService],
    exports: [RequisicaoExameService]
})
export class RequisicaoExameModule{}