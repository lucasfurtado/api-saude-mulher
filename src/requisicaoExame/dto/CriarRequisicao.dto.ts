import { IsNotEmpty } from "class-validator";
import ERespostaRequisicaoExame from "src/helper/Enums/ERespostaRequisicaoExame";

export class CriarRequisicaoDTO{

    constructor(){
        this.repostaRequisicao = ERespostaRequisicaoExame.NaoRespondido
    }

    @IsNotEmpty({message: 'Selecione um horário'})
    horarioConsulta: Date;

    @IsNotEmpty()
    repostaRequisicao: number

}