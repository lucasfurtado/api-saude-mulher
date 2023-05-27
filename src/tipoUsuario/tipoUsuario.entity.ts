import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipousuario'})
export class TipoUsuarioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'tipo', length: 20, nullable: false})
    tipo: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.tipoUsuario)
    usuarios: UsuarioEntity[];
}