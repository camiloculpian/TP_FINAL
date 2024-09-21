import { HttpStatus } from "@nestjs/common";
export declare enum responseStatus {
    OK = "OK",
    ERROR = "ERROR",
    WARN = "WARN",
    INFO = "INFO",
    UNAUTH = "UNAUTH"
}
export interface ResponseOptions<Entity = any> {
    statusCode: HttpStatus;
    status: responseStatus;
    message: string;
    data?: Entity;
}
export declare class Response {
    statusCode: HttpStatus;
    status: string;
    message: string;
    data: JSON;
    constructor(options: ResponseOptions);
}
