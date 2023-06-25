import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LaboratorioEntity } from "./laboratorio.entity";
import { IsNull, Not, Repository } from "typeorm";
import { EnviarExameDTO } from "./dto/enviarExame.dto";
import { ExamesEntity } from "src/exame/exame.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import ETipoUsuario from "src/helper/Enums/ETipoUsuario";
import { ItemExameFeitoDTO } from "./dto/itemExameFeito.dto";
import * as fs from 'fs';
import * as path from 'path';
import { IFile } from "src/helper/Interfaces/IFile.interface";
import { ItemExameResultado } from "./dto/itemExameResultado";

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

        let examesFeitos = await this.laboratorioRepository.find(
            {where: {usuarioId: usuario.id, pdfName: IsNull()}}
        );

        return examesFeitos.map(
            (exame) => new ItemExameFeitoDTO(exame.id, exame.exame.requisicaoExame.usuario.nome,exame.exame.requisicaoExame.horarioConsulta,exame.resultado)
        )
    }

    async enviarResultadoLaboratorio(id: number, file: IFile){
        if(file.mimetype == "application/pdf"){
            const laboratorio = await this.laboratorioRepository.findOne({where: {id:id}});
    
            const pdfFileName = `${laboratorio.exame.id}.pdf`
            
            const destino = "C:\\repos\\saude-projeto\\ResultadoLaboratorio";
            const nomeDoArquivo = pdfFileName;
            const caminhoCompleto = path.join(destino, nomeDoArquivo);
    
            fs.writeFileSync(caminhoCompleto, file.buffer);

            laboratorio.pdfName = pdfFileName;
            this.laboratorioRepository.update(id, laboratorio);
        }
        else{
            throw new BadRequestException("Tipo de arquivo não permitido");
        }
    }

    async obterExamesFeitos(){
        const resultados = await this.laboratorioRepository.find(
            {where: {pdfName: Not("")}}
        );
        return resultados.map(
            (resultado) => new ItemExameResultado(resultado.id,resultado.exame.requisicaoExame.usuario.nome,resultado.exame.requisicaoExame.usuario.cpf,resultado.usuario.nome)
        )
    }

    async obterRelatorio(id: number){
        const pdfPath = "C:\\repos\\saude-projeto\\ResultadoLaboratorio"

        const exame = await this.laboratorioRepository.findOne({
            where: {id: id}
        });

        const pdfname = exame.pdfName;

        const fullpath = path.join(pdfPath, pdfname);

        const file = fs.readFileSync(fullpath);

        const base64 = file.toString('base64');

        return {
            base64: base64
        };
    }
}