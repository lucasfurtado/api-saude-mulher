import { IsNotEmpty } from "class-validator";

export class CriarRequisicaoDTO{

    constructor(){
        this.repostaRequisicao = ERespostaRequisicaoExame.NaoRespondido
    }

    @IsNotEmpty({message: 'Selecione um horário'})
    horarioConsulta: Date;

    @IsNotEmpty()
    repostaRequisicao: number

}