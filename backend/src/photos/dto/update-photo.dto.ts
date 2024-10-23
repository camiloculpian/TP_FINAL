import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';

import { IsOptional, IsNumber, IsDate } from 'class-validator';

export class UpdatePhotoDto {
    // @IsOptional()
    // @IsNumber()
    // id_user?: number;

    // @IsOptional()
    // @IsNumber()
    // id_commerce?: number; // Referencia al comercio asociado a la foto

    // @IsOptional()
    // @IsDate()
    // fecha_photo?: Date;
}

