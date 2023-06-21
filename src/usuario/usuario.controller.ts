import { CriaAdminDTO } from './dto/criaAdministrador.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { EditaUsuarioDTO } from './dto/editaUsuario.dto';
import { CriaPacienteDTO } from './dto/criaPaciente.dto';
import { Public } from 'src/helper/decorator.helper';
import { CriaUsuarioLaboratorioDTO } from './dto/criaUsuarioLaboratorio.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get()
    async listarUsuarios(){
        return await this.usuarioService.listaUsuarios();
    }

    @Post('/admin')
    @Public()
    async criarAdmin(@Body() adm: CriaAdminDTO){
        await this.usuarioService.salvarUsuario(adm);
    }

    @Post('/paciente')
    @Public()
    async criarPaciente(@Body() paciente: CriaPacienteDTO){
        await this.usuarioService.salvarUsuario(paciente);
    }

    @Post('/laboratorio')
    @Public()
    async criaUsuarioLaboratorio(@Body() laboratorio: CriaUsuarioLaboratorioDTO){
        await this.usuarioService.salvarUsuario(laboratorio);
    }

    @Delete('/:id')
    async deletarUsuario(@Param('id') id: number){
        await this.usuarioService.deletarUsuario(id);
    }

    @Put('/:id')
    async editarUsuario(@Param('id') id: number, @Body() editaUsuario: EditaUsuarioDTO){
        await this.usuarioService.editarUsuario(id, editaUsuario);
    }

    @Get('/laboratorios')
    async listarLaboratorio(){
        return this.usuarioService.listaLaboratorio();
    }
    
    @Get('/paciente')
    async listaPacientes(){
        return await this.usuarioService.listaPaciente();
    }
    
    @Get('/:email')
    async procuraUsuarioComEmail(@Param('email') email: string){
        return await this.usuarioService.existeComEmail(email);
    }


}