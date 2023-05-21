import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { EmailIsUnicoValidator } from "./validacoes/emailIsUnico.validator";
import { CpfIsUnicoValidator } from "./validacoes/cpfIsUnico.validator";
import { TipoUsuarioEntity } from "src/tipoUsuario/tipoUsuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity]),TypeOrmModule.forFeature([TipoUsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, EmailIsUnicoValidator, CpfIsUnicoValidator],
    exports: [UsuarioService]
})
export class UsuarioModule {}