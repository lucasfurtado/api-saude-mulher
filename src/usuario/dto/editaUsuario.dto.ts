import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class EditaUsuarioDTO{
    
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, {message: 'O email informado é invalido'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}