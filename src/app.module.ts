import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import appConfig from './config/app.config';
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
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // store produnction env on cicd
      load: [appConfig],
    }),
    HealthModule,
    WinstomSettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
