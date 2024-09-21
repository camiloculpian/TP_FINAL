import { Transform } from 'class-transformer';
import {
    IsDateString,
    IsOptional,
    IsNumberString,
    IsHash,
    IsEmail,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsHash('sha512')
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsNumberString()
    @MinLength(7)
    @MaxLength(8)
    dni: string;

    @IsString()
    address: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;
}
