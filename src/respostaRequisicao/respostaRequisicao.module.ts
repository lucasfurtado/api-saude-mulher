import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RequisicaoExameEntity])],
})
export class RespostaRequisicaoModule{}