import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { EditaUsuarioDTO } from "./dto/editaUsuario.dto";
import { ListaUsuariosDTO } from "./dto/listaUsuarios.dto";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>) {}

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        return usuariosSalvos.map(
            (usuario) => new ListaUsuariosDTO(usuario.nome,usuario.email)
        )
    }

    async salvarUsuario(usuario: CriaUsuarioDTO) {
        const novoUsuario = new UsuarioEntity;
        novoUsuario.nome = usuario.nome;
        novoUsuario.cpf = usuario.cpf;
        novoUsuario.email = usuario.email;
        novoUsuario.senha = usuario.senha;

        return await this.usuarioRepository.save(novoUsuario);
    }

    async deletarUsuario(id: number){
        return await this.usuarioRepository.delete(id);
    }

    async editarUsuario(id: number, editarUsuario: EditaUsuarioDTO){
        const editaUsuario = new UsuarioEntity;
        editaUsuario.nome = editarUsuario.nome;
        editaUsuario.email = editarUsuario.email;
        editaUsuario.senha = editarUsuario.senha;
        
        return await this.usuarioRepository.update(id, editaUsuario);
    }
}