import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({async: true})
export class EmailIsUnicoValidator implements ValidatorConstraintInterface{

    constructor(private usuarioService: UsuarioService){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmail = await this.usuarioService.existeComEmail(value);
        return !(usuarioComEmail !== null);
    }

}

export const EmailIsUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailIsUnicoValidator
        })
    }
}