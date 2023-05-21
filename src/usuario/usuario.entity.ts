import { TipoUsuarioEntity } from "src/tipoUsuario/tipoUsuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', length: 255, nullable: false})
    nome: string;

    @Column({name: 'cpf', length: 50, nullable: false})
    cpf: string;

    @Column({name: 'cartaoSus', length: 50})
    cartaoSus: string;

    @Column({name: 'email', length: 50, nullable: false})
    email: string;

    @Column({name: 'senha', length: 255, nullable: false})
    senha: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToOne(() => TipoUsuarioEntity)
    @JoinColumn({ name: 'tipo_usuario_id' })
    tipoUsuario: TipoUsuarioEntity;
}