export class RequisicaoExameDTO{

    constructor(readonly id: number, readonly paciente: string, readonly cpfPaciente: string, readonly horarioConsulta: Date){}

}