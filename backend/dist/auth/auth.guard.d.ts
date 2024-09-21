import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    private readonly userService;
    constructor(jwtService: JwtService, reflector: Reflector, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extraxctTokenFromHeader;
}
