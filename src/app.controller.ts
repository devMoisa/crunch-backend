import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/ping')
  getHello() {
    return this.service.ping();
  }
}
