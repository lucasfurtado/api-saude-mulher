import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', length: 255, nullable: false})
    nome: string;

    @Column({name: 'email', length: 50, nullable: false})
    email: string;

    @Column({name: 'senha', length: 255, nullable: false})
    senha: string;
}