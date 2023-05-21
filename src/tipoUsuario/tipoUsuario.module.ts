import { Module } from "@nestjs/common";
import { TipoUsuarioService } from "./tipoUsuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoUsuarioEntity } from "./tipoUsuario.entity";
import { TipoUsuarioController } from "./tipoUsuario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TipoUsuarioEntity])],
    controllers: [TipoUsuarioController],
    providers: [TipoUsuarioService],
    exports: [TipoUsuarioService]
})
export class TipoUsuarioModule {}