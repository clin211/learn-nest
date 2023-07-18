import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './aaaException';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Roles } from './roles.decorator';
import { Role } from './role';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
