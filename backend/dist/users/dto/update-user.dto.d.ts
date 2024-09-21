import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    password?: string;
    name?: string;
    lastName?: string;
    address?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}
export {};
