import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AaaPipe } from './aaa.pipe';
import { AppService } from './app.service';
import { IntValidatePipePipe } from './int-validate-pipe.pipe';
import { Ooo } from './ooo/ooo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nnn/:bbb')
  nnn(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }
  @Post('ooo')
  ooo(@Body(new IntValidatePipePipe()) obj: Ooo) {
    console.log(obj);
  }
}
