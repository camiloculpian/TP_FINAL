import { Transform } from "class-transformer";
import { IsOptional, IsEmail, IsHash, IsNumberString, IsPhoneNumber, IsString, MaxLength, MinLength, IsEnum } from "class-validator";
import { Role } from "../../auth/enums/role.enum";
export class CreateUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    username: string;
    
    @IsEmail()
    email: string;

    @IsHash('sha512')
    password: string;

    @IsOptional()
    @IsEnum(Role)
    roles?: Role;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsNumberString()
    @MinLength(7)
    @MaxLength(8)
    dni: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;
}
