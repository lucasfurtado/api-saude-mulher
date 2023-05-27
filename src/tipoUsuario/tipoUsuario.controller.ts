import { Controller, Get } from "@nestjs/common";
import { TipoUsuarioService } from "./tipoUsuario.service";
import { Public } from "src/helper/decorator.helper";

@Controller('/tipousuario')
export class TipoUsuarioController{

    constructor(private tipoUsuarioService: TipoUsuarioService) {}

    @Get()
    async listarTiposUsuarios(){
        return await this.tipoUsuarioService.listaTiposUsuarioService();
    }
}