import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO{

    @IsEmail(undefined, {message: 'Digite um email valido'})
    email: string;

    @IsNotEmpty()
    senha: string;
}