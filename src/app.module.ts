import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RangeController } from './range/range.controller';
import { RangeService } from './range/range.service';
import Configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
        UserModule,
    ],
    controllers: [RangeController],
    providers: [RangeService],
})
export class AppModule {}
