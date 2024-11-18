import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello():any {
    console.log('**REQUEST getHello()...');
    return '{"message": "OK!"}';
  }
}
