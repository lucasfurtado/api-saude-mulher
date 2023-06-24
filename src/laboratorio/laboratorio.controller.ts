import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { LaboratorioService } from "./laboratorio.service";
import { EnviarExameDTO } from "./dto/enviarExame.dto";
import * as jwt from 'jsonwebtoken';
import { IDecodedToken } from "src/helper/Interfaces/IDecodedToken.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import * as path from 'path';
import { IFile } from "src/helper/Interfaces/IFile.interface";

@Controller('/laboratorio')
export class LaboratorioController{

    constructor(private laboratorioService: LaboratorioService) {}

    @Post('/enviarExame')
    async enviarExame(@Body() exame: EnviarExameDTO){
        await this.laboratorioService.enviarExame(exame);
    }

    @Get('/listaExamesFeitos')
    async listaExamesFeitos(@Req() request: Request){

        const authorizationHeader = request.headers['authorization'];
        const token = authorizationHeader.slice(7); // Remove o prefixo "Bearer " para obter apenas o token
        const decodedToken = jwt.decode(token) as IDecodedToken; // Decodifica o token

        return this.laboratorioService.listaExames(decodedToken.id);
    }

    @Post('/enviarResultado/:id')
    @UseInterceptors(FileInterceptor('file'))
    enviarResultado(@Param('id') id: number, @UploadedFile() file){
        this.laboratorioService.enviarResultadoLaboratorio(id, file as IFile);
    }
}