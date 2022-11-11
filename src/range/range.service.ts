import { Injectable } from '@nestjs/common';

@Injectable()
export class RangeService {
    range(args: string) {
        if (!args || isNaN(Number(args)) || typeof Number(args) !== 'number') {
            return {
                code: 400,
                message: '参数错误',
                data: [],
            };
        }

        const data = [];
        for (let i = 1, len = Number(args); i <= len; i++) {
            data.push(i);
        }

        return {
            code: 200,
            message: '请求成功',
            data,
        };
    }
}
