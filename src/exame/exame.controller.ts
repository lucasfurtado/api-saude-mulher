import { Controller, Get, Param, Post } from "@nestjs/common";
import { ExameService } from "./exame.service";

@Controller('/exame')
export class ExameController{

    constructor(private exameService: ExameService){}

    @Get()
    async listaExames(){
        return await this.exameService.listarExames();
    }

    @Post('aceitar/:id')
    async marcarExame(@Param('id') id: number){
        return await this.exameService.marcarExame(id);
    }

    @Post('recusar/:id')
    async recusarExame(@Param('id') id: number){
        return await this.exameService.recusarExame(id);
    }
}