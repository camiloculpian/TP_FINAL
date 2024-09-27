
import { IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreatePhotoDto {
    @IsNotEmpty()
    @IsNumber()
    id_user: number;

    @IsNotEmpty()
    @IsNumber()
    id_commerce: number;

    @IsNotEmpty()
    @IsDate()
    fecha_photo: Date;
}

