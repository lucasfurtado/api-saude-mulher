import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamesEntity } from './exame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExameService{

    constructor(@InjectRepository(ExamesEntity) private readonly examesRepository: Repository<ExamesEntity>){}

    async listarExames(){
        return await this.examesRepository.find();
    }
}