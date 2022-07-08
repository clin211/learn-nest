import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const generateDocument = app => {
    const options = new DocumentBuilder()
        .setTitle('Getaway')
        .setDescription('packageConfig.description')
        .setVersion('v1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/doc', app, document);
};
