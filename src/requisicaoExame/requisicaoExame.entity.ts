import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('requisicaoexame')
export class RequisicaoExameEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'horario_consulta', length: 255, nullable: false})
    HorarioConsulta: string;

    @Column({name: 'aceito', nullable: true})
    Aceito: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.requisicoesExame, { eager: true })
    usuario: UsuarioEntity
}