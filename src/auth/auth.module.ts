import { Module } from "@nestjs/common";
import { UsuarioModule } from "src/usuario/usuario.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UsuarioModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{

}