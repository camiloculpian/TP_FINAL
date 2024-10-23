// export class CreateCommerceDto {}

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsJSON } from 'class-validator';

import { Horario, Tramite } from '../entities/commerce.entity';

export class CreateCommerceDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    // MUCHOS A MUCHOS RUBRO
    // rubro: ;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    ubicacion: string;

    @IsNotEmpty()
    @IsString()
    horario: Horario

    @IsNotEmpty()
    @IsEnum(Tramite)
    tramite: Tramite;

    @IsNotEmpty()
    @IsString()
    imagen: string
}
