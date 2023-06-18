import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{

    constructor(private usuarioService: UsuarioService, private jwtService: JwtService) {}

    async login(email: string, senha: string){

        const usuario = await this.usuarioService.existeComEmail(email);

        if(!usuario || ! await bcrypt.compare(senha, usuario.senha)){
            throw new UnauthorizedException('Email e/ou senha inválidos, cheque as credenciais');
        }
        
        const payload = { usuario: usuario.nome, id: usuario.id, email: usuario.email, cpf: usuario.cpf, tipousuario: usuario.tipoUsuario.tipo };

        return {
            token: await this.jwtService.signAsync(payload),
        };

    }
}