
import { LaboratorioEntity } from "src/laboratorio/laboratorio.entity";
import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";
import { TipoUsuarioEntity } from "src/tipoUsuario/tipoUsuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', length: 255, nullable: false})
    nome: string;

    @Column({name: 'cpf', length: 50, nullable: false})
    cpf: string;

    @Column({name: 'email', length: 50, nullable: false})
    email: string;

    @Column({name: 'senha', length: 255, nullable: false})
    senha: string;

    @Column({name: 'tipoUsuarioId', nullable: false})
    usuarioId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => TipoUsuarioEntity, tipoUsuario => tipoUsuario.usuarios, { eager: true })
    tipoUsuario: TipoUsuarioEntity;

    @OneToMany(() => RequisicaoExameEntity, requisicaoExame => requisicaoExame.usuario)
    requisicoesExame: RequisicaoExameEntity[]

    @OneToMany(() => LaboratorioEntity, laboratorio => laboratorio.usuario)
    laboratorio: LaboratorioEntity[]
}