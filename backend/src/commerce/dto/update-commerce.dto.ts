import { PartialType } from '@nestjs/mapped-types';
import { CreateCommerceDto } from './create-commerce.dto';

// export class UpdateCommerceDto extends PartialType(CreateCommerceDto) {}


import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Horario, Tramite } from '../entities/commerce.entity'; // Asegúrate de importar el enum

export class UpdateCommerceDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    ubicacion?: string;

    @IsOptional()
    @IsEnum(Tramite)
    horario?: Horario;

    @IsOptional()
    @IsString()
    imagen?: string;

    @IsOptional()
    @IsEnum(Tramite)
    tramite?: Tramite; 
}