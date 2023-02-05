import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http.exception';
import { ILoggerService } from './logger/interfaces/loggerService.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(ILoggerService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(configService.get('app.port'));
}
bootstrap();
