import { Controller, Inject, Get } from '@nestjs/common';
import {
  CccModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private options: CccModuleOptions;

  @Get()
  hello() {
    return this.options;
  }
}
