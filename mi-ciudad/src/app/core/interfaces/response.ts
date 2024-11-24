export interface ResponseOptions<Entity = any> {
    statusCode:string;
    status: string;
    message: string;
    data?: Entity;
}

export interface Response{
    // public statusCode:string;
    // public status:string;
    // public message:string;
    // public data:JSON;

    // constructor(options: ResponseOptions){
    //     this.statusCode=options.statusCode;
    //     this.status=options.status;
    //     this.message=options.message;
    //     this.data=options.data;
    // }
    statusCode:string;
    status:string;
    message:string;
    data:JSON

}