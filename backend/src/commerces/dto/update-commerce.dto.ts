import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Rubro } from 'src/rubros/entities/rubro.entity';
import { Tramite } from '../entities/commerce.entity';

export class UpdateCommerceDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    rubros?: Rubro[];

    @IsOptional()
    @IsEnum(Tramite)
    tramite?: Tramite; // Asignado como "Alta" en el backend

    @IsOptional()
    @IsString()
    frontPicture?: string;

    @IsOptional()
    photos?: string[];

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