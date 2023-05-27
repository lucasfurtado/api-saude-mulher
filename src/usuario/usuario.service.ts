import { BadRequestException, Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CriaAdminDTO } from "./dto/criaAdministrador.dto";
import { EditaUsuarioDTO } from "./dto/editaUsuario.dto";
import { ListaUsuariosDTO } from "./dto/listaUsuarios.dto";
import * as bcrypt from 'bcrypt';
import { TipoUsuarioEntity } from "src/tipoUsuario/tipoUsuario.entity";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(TipoUsuarioEntity) private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>) {}

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        return usuariosSalvos.map(
            (usuario) => new ListaUsuariosDTO(usuario.nome,usuario.email)
        )
    }

    async salvarAdministrador(usuario: CriaAdminDTO) {
        const novoUsuario = new UsuarioEntity;
        novoUsuario.nome = usuario.nome;
        novoUsuario.cpf = usuario.cpf;
        novoUsuario.email = usuario.email;
        novoUsuario.tipoUsuario = await this.tipoUsuarioRepository.findOne(
            {where: { id: usuario.tipoUsuario}}
        );
        novoUsuario.senha = await this.encriptografarSenha(usuario.senha);

        return await this.usuarioRepository.save(novoUsuario);
    }

    async deletarUsuario(id: number){
        return await this.usuarioRepository.delete(id);
    }

    async editarUsuario(id: number, editarUsuario: EditaUsuarioDTO){
        const editaUsuario = new UsuarioEntity;
        editaUsuario.nome = editarUsuario.nome;
        editaUsuario.email = editarUsuario.email;
        editaUsuario.senha = await this.encriptografarSenha(editaUsuario.senha);
        
        return await this.usuarioRepository.update(id, editaUsuario);
    }

    async existeComEmail(email: string){
        const possivelUsuario = await this.usuarioRepository.findOne({
            where: { email },
        });
        return possivelUsuario;
    }

    async existeComCpf(cpf: string){
        const possivelUsuario = await this.usuarioRepository.findOne({
            where: { cpf },
        });
        return possivelUsuario;
    }

    private async encriptografarSenha(senha: string) : Promise<string>{
        const saltRounds = 10;
        return await bcrypt.hash(senha, saltRounds);
    }
}