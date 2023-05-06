import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>) {}

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        return usuariosSalvos
    }
}