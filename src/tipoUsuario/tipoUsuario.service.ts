import { TipoUsuarioDTO } from './dto/tipoUsuario.sto';
import { Injectable } from "@nestjs/common";
import { TipoUsuarioEntity } from "./tipoUsuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TipoUsuarioService {

    constructor(@InjectRepository(TipoUsuarioEntity) private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>) {}

    async listaTiposUsuarioService(){
        const tipoUsuarios = await this.tipoUsuarioRepository.find();
        return tipoUsuarios.map(
            (tipoUsuario) => new TipoUsuarioDTO(tipoUsuario.id,tipoUsuario.tipo)
        )
    }
}