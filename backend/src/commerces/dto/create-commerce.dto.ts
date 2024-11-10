// export class CreateCommerceDto {}

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { Tramite } from '../entities/commerce.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';
import { Photo } from 'src/photos/entities/photo.entity';

export class CreateCommerceDto {
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string; // Opcional, por defecto será null

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
    frontPicture?: string; // Opcional, por defecto será null

    @IsOptional()
    photos?: Photo[];

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

