import { PartialType } from '@nestjs/mapped-types';
import { CreateCommerceDto } from './create-commerce.dto';

// export class UpdateCommerceDto extends PartialType(CreateCommerceDto) {}


import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Horario, Tramite } from '../entities/commerce.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';

export class UpdateCommerceDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    rubros?: Rubro[];

    @IsOptional()
    @IsString()
    ubicacion?: string;

    @IsOptional()
    @IsEnum(Tramite)
    horario?: Horario;

    @IsOptional()
    @IsString()
    fachada?: string;

    @IsOptional()
    @IsEnum(Tramite)
    tramite?: Tramite; 
}