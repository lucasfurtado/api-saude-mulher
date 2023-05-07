import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CriaUsuarioDTO{

    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;

    @IsNotEmpty({message: 'O CPF não pode ser vazio'})
    @MinLength(11, { message: 'O CPF é pequeno demais' })
    @MaxLength(11, { message: 'O CPF é grande demais' })
    cpf: string;

    @IsEmail(undefined, {message: 'O email informado é invalido'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}