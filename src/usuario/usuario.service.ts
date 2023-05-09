import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { EditaUsuarioDTO } from "./dto/editaUsuario.dto";
import { ListaUsuariosDTO } from "./dto/listaUsuarios.dto";
import * as bcrypt from 'bcrypt';

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

        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(usuario.senha, saltRounds);

        const novoUsuario = new UsuarioEntity;
        novoUsuario.nome = usuario.nome;
        novoUsuario.cpf = usuario.cpf;
        novoUsuario.email = usuario.email;
        novoUsuario.senha = senhaHash;

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
}