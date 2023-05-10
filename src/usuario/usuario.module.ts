import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { EmailIsUnicoValidator } from "./validacoes/emailIsUnico.validator";
import { CpfIsUnicoValidator } from "./validacoes/cpfIsUnico.validator";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, EmailIsUnicoValidator, CpfIsUnicoValidator],
    exports: [UsuarioService]
})
export class UsuarioModule {}