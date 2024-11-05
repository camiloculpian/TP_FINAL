// export class CreateCommerceDto {}

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail, isArray } from 'class-validator';
import { Tramite } from '../entities/commerce.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';

export class CreateCommerceDto {
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    
    rubros: Rubro[];

    // AGREGAR LUEGO
    // @IsNotEmpty()
    // @IsString()
    // ubicacion: string;

    @IsOptional()
    @IsEnum(Tramite)
    tramite?: Tramite; // Asignado como "Alta" en el backend

    @IsOptional()
    @IsString()
    imagen?: string; // Opcional, por defecto será null

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsEmail()
    correo?: string;

}

