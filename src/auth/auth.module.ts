import { Module } from "@nestjs/common";
import { UsuarioModule } from "src/usuario/usuario.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstant } from "./secret";


@Module({
    imports: [
        UsuarioModule,
        JwtModule.register({
            global: true,
            secret: jwtConstant.secret,
            signOptions: { expiresIn: '12h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}