import { Module } from "@nestjs/common";
import { ExamesEntity } from "./exame.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExameService } from "./exame.service";
import { ExameController } from "./exame.controller";
import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";
import { RespostaRequisicaoEntity } from "src/respostaRequisicao/respostaRequisicao.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ExamesEntity]),TypeOrmModule.forFeature([RequisicaoExameEntity]),TypeOrmModule.forFeature([RespostaRequisicaoEntity])],
    controllers: [ExameController],
    providers: [ExameService],
    exports: [ExameService]
})
export class ExameModule{}