import { Injectable } from "@nestjs/common";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { CriarRequisicaoDTO } from "./dto/CriarRequisicao.dto";
import { RequisicaoExameDTO } from "./dto/requisicaoExame.dto";
import { RespostaRequisicaoEntity } from "src/respostaRequisicao/respostaRequisicao.entity";
import ERespostaRequisicaoExame from "src/helper/Enums/ERespostaRequisicaoExame";

@Injectable()
export class RequisicaoExameService{
    
    constructor(
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>,
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RespostaRequisicaoEntity) private readonly respostaRequisicaoRepository: Repository<RespostaRequisicaoEntity>
    ) {}

    async criarRequisicaoExame(requisicaoExame: CriarRequisicaoDTO, usuarioId: number){
        const novaRequisicao = new RequisicaoExameEntity;
        novaRequisicao.horarioConsulta = requisicaoExame.horarioConsulta;
        novaRequisicao.usuario = await this.usuarioRepository.findOne(
            {where: { id: usuarioId}}
        );
        novaRequisicao.respostaRequisicao = await this.respostaRequisicaoRepository.findOne(
            {where: {id: requisicaoExame.repostaRequisicao}}
        );
        await this.requisicaoExameRepository.save(novaRequisicao);
    }

    async obterRequisicoesExamesEnviados(){
    
        const naoRespondido = await this.respostaRequisicaoRepository.findOne(
            {where: {id: ERespostaRequisicaoExame.NaoRespondido}}
        );

        const requisicoes = await this.requisicaoExameRepository.find(
            {where: { respostaRequisicao: naoRespondido}}
        );

        return requisicoes.map(
            (requisicao) => new RequisicaoExameDTO(
                requisicao.id, 
                requisicao.usuario.nome, 
                requisicao.usuario.cpf, 
                requisicao.horarioConsulta, 
                requisicao.respostaRequisicao.resposta
            )
        )
    }
}