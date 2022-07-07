import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUser(): object {
    return {
      code: 200,
      message: 'success',
      list: [],
    };
  }
}
