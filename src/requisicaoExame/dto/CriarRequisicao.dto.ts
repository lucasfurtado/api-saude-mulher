import { IsNotEmpty } from "class-validator";

export class CriarRequisicaoDTO{

    @IsNotEmpty({message: 'Selecione um horário'})
    horarioConsulta: string;

}