import { Body, Controller, Post, Req, UnauthorizedException } from "@nestjs/common";
import { CriarRequisicaoDTO } from "./dto/CriarRequisicao.dto";
import { RequisicaoExameService } from "./requisicaoExame.service";
import * as jwt from 'jsonwebtoken';
import { IDecodedToken } from "src/helper/Interfaces/IDecodedToken.interface";

@Controller('/requisicaoexame')
export class RequisicaoExameController{

    constructor(private requisicaoExameService: RequisicaoExameService){}

    @Post()
    async criarRequisicaoExame(@Body() requisicaoExame: CriarRequisicaoDTO,@Req() request: Request){

        const authorizationHeader = request.headers['authorization'];
        const token = authorizationHeader.slice(7); // Remove o prefixo "Bearer " para obter apenas o token
        const decodedToken = jwt.decode(token) as IDecodedToken; // Decodifica o token
        console.log(decodedToken.id);

        return await this.requisicaoExameService.criarRequisicaoExame(requisicaoExame, decodedToken.id);
        
    }
}