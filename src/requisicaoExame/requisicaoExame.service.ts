import { Injectable } from "@nestjs/common";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { CriarRequisicaoDTO } from "./dto/CriarRequisicao.dto";
import { RequisicaoExameDTO } from "./dto/requisicaoExame.dto";
import { RespostaRequisicaoEntity } from "src/respostaRequisicao/respostaRequisicao.entity";

@Injectable()
export class RequisicaoExameService{
    
    constructor(
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>,
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RespostaRequisicaoEntity) private readonly respostaRequisicaoRepository: Repository<RespostaRequisicaoEntity>
    ) {}

    async criarRequisicaoExame(requisicaoExame: CriarRequisicaoDTO, usuarioId: number){
        const novaRequisicao = new RequisicaoExameEntity;
        novaRequisicao.HorarioConsulta = requisicaoExame.horarioConsulta;
        novaRequisicao.usuario = await this.usuarioRepository.findOne(
            {where: { id: usuarioId}}
        );
        novaRequisicao.respostaRequisicao = await this.respostaRequisicaoRepository.findOne(
            {where: {id: requisicaoExame.repostaRequisicao}}
        );
        await this.requisicaoExameRepository.save(novaRequisicao);
    }

    async obterRequisicoesExamesEnviados(){
        // const requiscoes = await this.requisicaoExameRepository.find(
        //     {where: { Aceito: null}}
        // );
        // return requiscoes.map(
        //     (requisicao) => new RequisicaoExameDTO(requisicao.id, requisicao.usuario.nome, requisicao.usuario.cpf, requisicao.HorarioConsulta)
        // )
    }
}