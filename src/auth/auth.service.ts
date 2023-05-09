import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    constructor(private usuarioService: UsuarioService) {}

    async login(email: string, senha: string){

        const usuario = await this.usuarioService.existeComEmail(email);

        if(!usuario || ! await bcrypt.compare(senha, usuario.senha)){
            throw new UnauthorizedException('Email e/ou senha inválidos, cheque as credenciais');
        }
        
        

        return 'Logado!';
    }
}