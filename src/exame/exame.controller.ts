import { Controller, Get } from "@nestjs/common";
import { ExameService } from "./exame.service";

@Controller('/exame')
export class ExameController{

    constructor(private exameService: ExameService){}

    @Get()
    async listaExames(){
        return await this.exameService.listarExames();
    }
}