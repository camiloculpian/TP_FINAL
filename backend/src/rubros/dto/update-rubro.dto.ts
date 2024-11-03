import { IsOptional, IsString } from "class-validator";

export class UpdateRubroDto {

    @IsOptional()
    @IsString()
    codigo: string;

    @IsOptional()
    @IsString()
    descripcion: string

    @IsOptional()
    @IsString()
    descripcion_l: string

}