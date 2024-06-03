import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping() {
    return {
      message: 'Pong xD',
      status: 'API online =)',
    };
  }
}
