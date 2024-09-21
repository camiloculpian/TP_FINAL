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
    IsUrl,
    IsEnum,
} from 'class-validator';

export class RegisterUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    username: string;

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

    @IsDateString()
    birthDate: Date;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;
}
