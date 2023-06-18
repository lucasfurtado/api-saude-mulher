export class RequisicaoExameDTO{

    constructor(readonly codigo: number, readonly paciente: string, readonly dataConsulta: Date, readonly estadoConsulta: number){}

}