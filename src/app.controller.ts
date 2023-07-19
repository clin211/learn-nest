import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('hello1')
  getHello1() {
    return 'Hello 1';
  }
  @Get('hello2')
  getHello2() {
    return 'Hello 1';
  }
  @Get('world')
  world() {
    return 'Hello 1';
  }
  @Get('world1')
  world1() {
    return 'world 1';
  }
}
