import { IsNotEmpty } from "class-validator";

export class EnviarExameDTO{

    @IsNotEmpty({message: 'Envie um Id'})
    id: number;

    @IsNotEmpty({message: 'Envie um resultado'})
    resultado: string
}