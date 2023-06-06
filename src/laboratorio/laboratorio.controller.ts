import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LaboratorioService } from "./laboratorio.service";
import { EnviarExameDTO } from "./dto/enviarExame.dto";

@Controller('/laboratorio')
export class LaboratorioController{

    constructor(private laboratorioService: LaboratorioService) {}

    @Post('/enviarExame')
    async enviarExame(@Body() exame: EnviarExameDTO){
        await this.laboratorioService.enviarExame(exame);
    }

    @Get('/listaExamesFeitos')
    async listaExamesFeitos(){
        return this.laboratorioService.listaExames();
    }
}