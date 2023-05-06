import { Controller, Get } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get()
    async listarUsuarios(){
        const usuariosSalvos = await this.usuarioService.listaUsuarios();
        return usuariosSalvos;
    }

}