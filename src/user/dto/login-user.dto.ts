import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

    @IsNotEmpty({ message: '用户名不能为空' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6, { message: '密码不能少于6位' })
    @MaxLength(20, { message: '密码不能超过20位' })
    password: string;
}
