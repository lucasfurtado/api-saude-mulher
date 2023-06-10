import { RequisicaoExameEntity } from "src/requisicaoExame/requisicaoExame.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'respostarequisicao'})
export class RespostaRequisicaoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'resposta', length: 20, nullable: false})
    resposta: string;

    @OneToMany(() => RequisicaoExameEntity, requisicaoExame => requisicaoExame.respostaRequisicao)
    respostasRequisicao: RequisicaoExameEntity[];
    
}