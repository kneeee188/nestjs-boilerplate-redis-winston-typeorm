import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http.exception';
import { ILoggerService } from './logger/interfaces/logger-service.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(ILoggerService);

  if (['dev', 'test'].includes(configService.get('app.nodeEnv'))) {
    const config = new DocumentBuilder()
      .setTitle(configService.get('app.name'))
      .setDescription(`The ${configService.get('app.name')} API description`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(configService.get('app.port'));
}
bootstrap();
