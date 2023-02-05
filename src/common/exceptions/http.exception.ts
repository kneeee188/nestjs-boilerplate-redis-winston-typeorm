import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ILoggerService } from 'src/logger/interfaces/loggerService.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const description = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Send alert here or in logging server
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      exception = new InternalServerErrorException();
      this.logger.error(
        `[${new Date()}] [${req.method}] ${req.url} - ${exception} - ${
          exception.stack
        }}`,
      );
    }

    res.status(status).json({
      statusCode: status,
      description,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
