import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
declare const module: any;

async function bootstrap() {
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    // 设置全局版本号
    app.enableVersioning({
        defaultVersion: [VERSION_NEUTRAL, '1', '2'], // 默认全局版本号
        type: VersioningType.URI,
    });

    // 添加全局拦截器
    app.useGlobalInterceptors(new TransformInterceptor());

    // 异常处理
    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

    await app.listen(3000);
}
bootstrap();
