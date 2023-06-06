import { ExamesEntity } from "src/exame/exame.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'laboratorio' })
export class LaboratorioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'resultado', length: 255, nullable: false})
    resultado: string;

    @OneToOne(() => ExamesEntity, { eager: true })
    @JoinColumn({ name: 'exame_id' })
    exame: ExamesEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}