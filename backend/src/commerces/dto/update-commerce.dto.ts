import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Rubro } from 'src/rubros/entities/rubro.entity';

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
    @IsString()
    ubicacion?: string;

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