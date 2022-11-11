import { Controller, Get, Query } from '@nestjs/common';
import { RangeService } from './range.service';

@Controller()
export class RangeController {
    constructor(private rangeService: RangeService) {}

    @Get('/range')
    range(@Query('num') number) {
        return this.rangeService.range(number);
    }
}
