import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { LaboratorioService } from "./laboratorio.service";
import { EnviarExameDTO } from "./dto/enviarExame.dto";
import * as jwt from 'jsonwebtoken';
import { IDecodedToken } from "src/helper/Interfaces/IDecodedToken.interface";

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
}