import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamesEntity } from './exame.entity';
import { Repository } from 'typeorm';
import { RequisicaoExameEntity } from 'src/requisicaoExame/requisicaoExame.entity';
import { RespostaRequisicaoEntity } from 'src/respostaRequisicao/respostaRequisicao.entity';
import ERespostaRequisicaoExame from 'src/helper/Enums/ERespostaRequisicaoExame';

@Injectable()
export class ExameService{

    constructor(
        @InjectRepository(ExamesEntity) private readonly examesRepository: Repository<ExamesEntity>,
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>,
        @InjectRepository(RespostaRequisicaoEntity) private readonly respostaRequisicaoRepository: Repository<RespostaRequisicaoEntity>
    ){}

    async listarExames(){
        return await this.examesRepository.find();
    }

    async marcarExame(idRequisicaoExame: number){
        const exame = new ExamesEntity;

        const requisicaoExame = await this.requisicaoExameRepository.findOne(
            {where: { id: idRequisicaoExame}}
        );

        if(requisicaoExame === null){
            throw new BadRequestException('Essa requisição de exame não existe.')
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
}