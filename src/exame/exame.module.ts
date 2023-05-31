import { Module } from "@nestjs/common";
import { ExamesEntity } from "./exame.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExameService } from "./exame.service";
import { ExameController } from "./exame.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ExamesEntity])],
    controllers: [ExameController],
    providers: [ExameService],
    exports: [ExameService]
})
export class ExameModule{}