import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LaboratorioEntity } from "./laboratorio.entity";
import { Repository } from "typeorm";
import { EnviarExameDTO } from "./dto/enviarExame.dto";
import { ExamesEntity } from "src/exame/exame.entity";

@Injectable()
export class LaboratorioService{

    constructor(
        @InjectRepository(LaboratorioEntity) private readonly laboratorioRepository: Repository<LaboratorioEntity>,
        @InjectRepository(ExamesEntity) private readonly exameRepository: Repository<ExamesEntity>
    ){}

    async enviarExame(exame: EnviarExameDTO){
        const exameLaboratorio = new LaboratorioEntity;
        const obtemExame = await this.exameRepository.findOne(
            {where: { id: exame.id}}
        );
        obtemExame.feito = true;

        exameLaboratorio.exame = obtemExame;
        exameLaboratorio.resultado = exame.resultado;


        await this.laboratorioRepository.save(exameLaboratorio);
        await this.exameRepository.update(exame.id, obtemExame);
    }

    async listaExames(){
        return this.laboratorioRepository.find();
    }
}