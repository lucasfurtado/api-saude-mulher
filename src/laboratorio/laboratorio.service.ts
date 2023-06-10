import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LaboratorioEntity } from "./laboratorio.entity";
import { Repository } from "typeorm";
import { EnviarExameDTO } from "./dto/enviarExame.dto";
import { ExamesEntity } from "src/exame/exame.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import ETipoUsuario from "src/helper/Enums/ETipoUsuario";
import { ItemExameDTO } from "./dto/itemExame.dto";

@Injectable()
export class LaboratorioService{

    constructor(
        @InjectRepository(LaboratorioEntity) private readonly laboratorioRepository: Repository<LaboratorioEntity>,
        @InjectRepository(ExamesEntity) private readonly exameRepository: Repository<ExamesEntity>,
        @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    ){}

    async enviarExame(exame: EnviarExameDTO){
        const exameLaboratorio = new LaboratorioEntity;

        const obtemExame = await this.exameRepository.findOne(
            {where: { id: exame.id}}
        );

        const obtemUsuarioLaboratorio = await this.usuarioRepository.findOne(
            {where: { id: exame.idLaboratorio}}
        );

        if(obtemExame == null){
            throw new BadRequestException('Exame não encontrado')
        }
        else{
            if(obtemExame.feito == true){
                throw new BadRequestException('Esse exame já foi feito')
            }
        }

        if(obtemUsuarioLaboratorio == null){
            throw new BadRequestException('Usuário não encontrado')
        }
        else{
            if(obtemUsuarioLaboratorio.tipoUsuario.id !== ETipoUsuario.Laboratorio){
                throw new BadRequestException('Usuário não é do tipo laboratório')
            }
        }

        obtemExame.feito = true;

        exameLaboratorio.exame = obtemExame;
        exameLaboratorio.resultado = exame.resultado;
        exameLaboratorio.usuario = obtemUsuarioLaboratorio;


        await this.laboratorioRepository.save(exameLaboratorio);
        await this.exameRepository.update(exame.id, obtemExame);
    }

    async listaExames(usuarioId: number){

        const usuario = await this.usuarioRepository.findOne(
            {where: {id: usuarioId}}
        )

        if(usuario.tipoUsuario.id !== ETipoUsuario.Laboratorio){
            throw new UnauthorizedException('Você não tem permissão para obter resultados de exames')
        }

        const examesFeitos = await this.laboratorioRepository.find(
            {where: {usuarioId: usuario.id}}
        );

        return examesFeitos.map(
            (exame) => new ItemExameDTO(exame.id, exame.exame.requisicaoExame.usuario.nome, exame.resultado)
        );
    }
}