export class ItemExameFeitoDTO{

    constructor(readonly codigo: number, readonly paciente: string, readonly horarioConsulta: Date, readonly resultadoExame: string) {}
}