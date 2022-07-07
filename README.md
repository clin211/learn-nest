```
*.controller.ts  常见功能是用来处理 http 请求以及调用 service 层的处理方法
*.modules.ts     根模块用于处理其他类的引用与共享
*.service.ts     封装通用的业务逻辑、与数据层的交互（例如数据库）、其他额外的一些三方请求
main.ts          应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例
```

## nest-cli 配置
> 项目根目录的 `nest-cli.json` 文件
```json
"generateOptions": {
    "spec": false  // 创建文件时，不需要创建 spec 文件
}
```

## nest command
- 生成一个模块 (nest g mo) 来组织代码，使其保持清晰的界限（Module）。
- 生成一个控制器 (nest g co) 来定义CRUD路径（Controller）。
- 生成一个服务 (nest g s) 来表示/隔离业务逻辑（Service）。
- 生成一个实体类/接口来代表资源数据类型（Entity）