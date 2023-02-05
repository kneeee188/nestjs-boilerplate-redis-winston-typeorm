import { Inject, Injectable } from '@nestjs/common';
import { ILoggerService } from './interfaces/loggerService.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class WinstonLoggerService implements ILoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  getNow() {
    this.logger.info(new Date());
  }

  info(data) {
    this.logger.info(data);
  }
}
