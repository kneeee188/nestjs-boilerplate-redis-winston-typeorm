import { Module } from '@nestjs/common';
import { ILoggerService } from './interfaces/loggerService.interface';
import { WinstonLoggerService } from './winstonLogger.service';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const logDir = 'logs';

const dailyLoggerOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `${level}-%DATE%.log`,
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
  };
};

const WinstomSettingModule = WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('projectName', {
          prettyPrint: true,
        }),
      ),
    }),
    new DailyRotateFile(dailyLoggerOptions('error')),
    new DailyRotateFile(dailyLoggerOptions('warn')),
    new DailyRotateFile(dailyLoggerOptions('info')),
  ],
});

@Module({
  imports: [WinstomSettingModule],
  providers: [
    {
      provide: ILoggerService,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
