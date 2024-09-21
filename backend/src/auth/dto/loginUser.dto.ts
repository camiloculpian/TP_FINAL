import { IsOptional, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsOptional()
    keepSessionOpen: boolean
}