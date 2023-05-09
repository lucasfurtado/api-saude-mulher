import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import { LoginDTO } from "./dto/login.dto";

@Controller('auth')
export class AuthController{
    
    constructor(private usuarioService: UsuarioService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logar(@Body() credenciais: LoginDTO){
        return await this.usuarioService.login(credenciais.email,credenciais.senha);
    }

}