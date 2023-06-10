export class ItemExameDTO{

    constructor(readonly id: number, readonly paciente: string, readonly horarioConsulta: Date, readonly status: string) {}
}