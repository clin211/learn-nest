```
*.controller.ts  常见功能是用来处理 http 请求以及调用 service 层的处理方法
*.modules.ts     根模块用于处理其他类的引用与共享
*.service.ts     封装通用的业务逻辑、与数据层的交互（例如数据库）、其他额外的一些三方请求
main.ts          应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例
```