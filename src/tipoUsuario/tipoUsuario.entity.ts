import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipousuario'})
export class TipoUsuarioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'tipo', length: 20, nullable: false})
    tipo: string;
}