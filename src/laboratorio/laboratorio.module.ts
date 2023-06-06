import { Module } from "@nestjs/common";
import { LaboratorioService } from "./laboratorio.service";
import { LaboratorioController } from "./laboratorio.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LaboratorioEntity } from "./laboratorio.entity";
import { ExamesEntity } from "src/exame/exame.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LaboratorioEntity]),TypeOrmModule.forFeature([ExamesEntity])],
    exports: [LaboratorioService],
    controllers: [LaboratorioController],
    providers: [LaboratorioService]
})
export class LaboratorioModule{}