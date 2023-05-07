export class ListaUsuariosDTO{

    constructor(nome: string, email: string){
        this.nome = nome;
        this.email = email;
    }

    nome: string;
    email: string;
}