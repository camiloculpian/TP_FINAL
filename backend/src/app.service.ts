import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello():any {
    return '{"message": "OK!"}';
  }
}
