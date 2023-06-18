import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Public } from "src/helper/decorator.helper";

@Controller('auth')
export class AuthController{
    
    constructor(private authService: AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logar(@Body() credenciais: LoginDTO){
        return await this.authService.login(credenciais.email,credenciais.password);
    }

}