import { Module } from "@nestjs/common";
import { OlaController } from "./ola.controller";
import { OlaService } from "./ola.service";

@Module({
    controllers: [OlaController],
    providers: [OlaService],
})
export class OlaModule {}