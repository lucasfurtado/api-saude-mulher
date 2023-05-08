import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailIsUnico } from "../validacoes/emailIsUnico.validator";

export class EditaUsuarioDTO{
    
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, {message: 'O email informado é invalido'})
    @EmailIsUnico({message: 'Já existe um usuário com este e-mail'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}