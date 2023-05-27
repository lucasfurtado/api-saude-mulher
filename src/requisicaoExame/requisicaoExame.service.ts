import { Injectable } from "@nestjs/common";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { CriarRequisicaoDTO } from "./dto/CriarRequisicao.dto";

@Injectable()
export class RequisicaoExameService{
    
    constructor(
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>,
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async criarRequisicaoExame(requisicaoExame: CriarRequisicaoDTO, usuarioId: number){
        const novaRequisicao = new RequisicaoExameEntity;
        novaRequisicao.Aceito = null;
        novaRequisicao.HorarioConsulta = requisicaoExame.horarioConsulta,
        novaRequisicao.usuario = await this.usuarioRepository.findOne(
            {where: { id: usuarioId}}
        )
        await this.requisicaoExameRepository.save(novaRequisicao);
    }
}