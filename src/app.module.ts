import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getConfig } from './utils';

@Module({
    imports: [
        UserModule,
        // 禁用解析 .env 的规则
        ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
