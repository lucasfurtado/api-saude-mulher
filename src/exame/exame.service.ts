import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamesEntity } from './exame.entity';
import { Repository } from 'typeorm';
import { RequisicaoExameEntity } from 'src/requisicaoExame/requisicaoExame.entity';
import { RespostaRequisicaoEntity } from 'src/respostaRequisicao/respostaRequisicao.entity';
import ERespostaRequisicaoExame from 'src/helper/Enums/ERespostaRequisicaoExame';
import { ItemExameDTO } from './dto/itemExame.dto';

@Injectable()
export class ExameService{

    constructor(
        @InjectRepository(ExamesEntity) private readonly examesRepository: Repository<ExamesEntity>,
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>,
        @InjectRepository(RespostaRequisicaoEntity) private readonly respostaRequisicaoRepository: Repository<RespostaRequisicaoEntity>
    ){}

    async listarExames(){
        const exames = await this.examesRepository.find(
            {where: { feito: false}}
        );
        return exames.map(
            (exame) => new ItemExameDTO(exame.id, exame.requisicaoExame.usuario.nome, exame.requisicaoExame.horarioConsulta, exame.requisicaoExame.respostaRequisicao.resposta)
        )
    }

    async marcarExame(idRequisicaoExame: number){
        const exame = new ExamesEntity;

        const requisicaoExame = await this.requisicaoExameRepository.findOne(
            {where: { id: idRequisicaoExame}}
        );

        if(requisicaoExame === null){
            throw new BadRequestException('Essa requisição de exame não existe.')
        }else{
            if(requisicaoExame.respostaRequisicao.id !== ERespostaRequisicaoExame.NaoRespondido){
                throw new BadRequestException('Essa requisição já foi respondida');
            }
        }

        const respondido = await this.respostaRequisicaoRepository.findOne(
            {where: {id: ERespostaRequisicaoExame.Aceito}}
        );
        requisicaoExame.respostaRequisicao = respondido;

        exame.feito = false;
        exame.requisicaoExame = requisicaoExame;
        
        await this.requisicaoExameRepository.update(idRequisicaoExame,requisicaoExame);
        await this.examesRepository.save(exame);
    }

    async recusarExame(idRequisicaoExame: number){

        const requisicaoExame = await this.requisicaoExameRepository.findOne(
            {where: { id: idRequisicaoExame}}
        );

        if(requisicaoExame === null){
            throw new BadRequestException('Essa requisição de exame não existe')
        }else{
            if(requisicaoExame.respostaRequisicao.id !== ERespostaRequisicaoExame.NaoRespondido){
                throw new BadRequestException('Essa requisição já foi respondida');
            }
        }

        const respondido = await this.respostaRequisicaoRepository.findOne(
            {where: {id: ERespostaRequisicaoExame.Recusado}}
        );
        requisicaoExame.respostaRequisicao = respondido;
        
        await this.requisicaoExameRepository.update(idRequisicaoExame,requisicaoExame);
    }
}