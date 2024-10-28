// export class CreateCommerceDto {}

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { Tramite, Rubro } from '../entities/commerce.entity';

export class CreateCommerceDto {
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsEnum(Rubro)
    rubro: Rubro;

    @IsNotEmpty()
    @IsString()
    ubicacion: string;

    @IsOptional()
    @IsEnum(Tramite)
    tramite?: Tramite; // Asignado como "Alta" en el backend

    @IsOptional()
    @IsString()
    imagen?: string; // Opcional, por defecto será null

    @IsNotEmpty()
    @IsString()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsOptional()
    deletedAt?: Date;
}

