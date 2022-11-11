import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
    constructor(private configService: ConfigService) {}
    @Get()
    user(): any {
        return {
            code: 200,
            data: [],
            message: 'successfully',
        };
    }

    @Post()
    users(): any {
        return {
            code: 200,
            data: [],
            message: 'successfully',
        };
    }

    @Get('/config')
    config(): any {
        const data = this.configService.get('db');
        return data;
    }
}
