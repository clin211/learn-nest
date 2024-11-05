import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(user => user.username === registerUserDto.username);

    if (foundUser) {
      throw new BadRequestException('用户已存在');
    }
    const user = new User();

    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }


  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(user => user.username === loginUserDto.username);

    if (!foundUser) {
      throw new BadRequestException('用户不存在');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('账号密码不存在或不正确');
    }
    return foundUser;
  }
}
