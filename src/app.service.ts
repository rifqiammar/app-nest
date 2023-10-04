import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'User';
  }

  getHello2(): string {
    return 'Hello World!';
  }

  getHello3(): string {
    return 'Hello World!';
  }
}
