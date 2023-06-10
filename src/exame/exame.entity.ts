import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('exames')
export class ExamesEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'feito', nullable: true})
    feito: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToOne(() => RequisicaoExameEntity, { eager: true })
    @JoinColumn({ name: 'requisicao_exame_id' })
    requisicaoExame: RequisicaoExameEntity;
    
}