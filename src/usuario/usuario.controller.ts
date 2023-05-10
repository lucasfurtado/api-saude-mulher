import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { EditaUsuarioDTO } from './dto/editaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get()
    async listarUsuarios(){
        return await this.usuarioService.listaUsuarios();
    }

    @Post()
    async salvarUsuario(@Body() criaUsuario: CriaUsuarioDTO){
        await this.usuarioService.salvarUsuario(criaUsuario);
    }

    @Delete('/:id')
    async deletarUsuario(@Param('id') id: number){
        await this.usuarioService.deletarUsuario(id);
    }

    @Put('/:id')
    async editarUsuario(@Param('id') id: number, @Body() editaUsuario: EditaUsuarioDTO){
        await this.usuarioService.editarUsuario(id, editaUsuario);
    }

    @Get('/:email')
    async procuraUsuarioComEmail(@Param('email') email: string){
        return await this.usuarioService.existeComEmail(email);
    }
}