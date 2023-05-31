import { Module } from "@nestjs/common";
import { ExamesEntity } from "./exame.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExameService } from "./exame.service";
import { ExameController } from "./exame.controller";
import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ExamesEntity]),TypeOrmModule.forFeature([RequisicaoExameEntity])],
    controllers: [ExameController],
    providers: [ExameService],
    exports: [ExameService]
})
export class ExameModule{}