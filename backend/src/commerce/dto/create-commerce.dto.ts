// export class CreateCommerceDto {}

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsJSON } from 'class-validator';

import { Horario, Tramite } from '../entities/commerce.entity';

export class CreateCommerceDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

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
    @IsString()
    imagen: string;

    @IsNotEmpty()
    @IsEnum(Tramite)
    tramite: Tramite;
}
