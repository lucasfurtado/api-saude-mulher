import { CriaAdminDTO } from './dto/criaAdministrador.dto';
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

    @Post('/admin')
    async criarAdmin(@Body() adm: CriaAdminDTO){
        await this.usuarioService.salvarAdministrador(adm);
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