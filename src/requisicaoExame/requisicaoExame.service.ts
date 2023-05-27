import { Injectable } from "@nestjs/common";
import { RequisicaoExameEntity } from "./requisicaoExame.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RequisicaoExameService{
    
    constructor(
        @InjectRepository(RequisicaoExameEntity) private readonly requisicaoExameRepository: Repository<RequisicaoExameEntity>
    ) {}

    
}