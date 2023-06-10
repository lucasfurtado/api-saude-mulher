import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamesEntity } from './exame.entity';
import { Repository } from 'typeorm';
import { RequisicaoExameEntity } from 'src/requisicaoExame/requisicaoExame.entity';

@Injectable()
export class ExameService{

    constructor(
        @InjectRepository(ExamesEntity) private readonly examesRepository: Repository<ExamesEntity>,
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>
    ){}

    async listarExames(){
        return await this.examesRepository.find();
    }

    async marcarExame(idRequisicaoExame: number){
        const exame = new ExamesEntity;

        const requisicaoExame = await this.requisicaoExameRepository.findOne(
            {where: { id: idRequisicaoExame}}
        );
        // requisicaoExame.Aceito = true;

        exame.feito = false;
        exame.requisicaoExame = requisicaoExame;
        
        await this.requisicaoExameRepository.update(idRequisicaoExame,requisicaoExame);
        return await this.examesRepository.save(exame);
    }
}