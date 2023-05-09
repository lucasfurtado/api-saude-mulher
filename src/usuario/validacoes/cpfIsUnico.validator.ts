import { Injectable } from '@nestjs/common';
import { UsuarioService } from './../usuario.service';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@Injectable()
@ValidatorConstraint({async: true})
export class CpfIsUnicoValidator implements ValidatorConstraintInterface{

    constructor(private usuarioService: UsuarioService){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComCpf = await this.usuarioService.existeComCpf(value);
        return !(usuarioComCpf !== null);
    }

}

export const CpfIsUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: CpfIsUnicoValidator
        })
    }
}