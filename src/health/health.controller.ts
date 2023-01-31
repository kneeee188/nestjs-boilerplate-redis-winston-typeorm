import { Controller, Get, HttpCode } from '@nestjs/common';
// import {
//   HealthCheck,
//   HealthCheckService,
//   HttpHealthIndicator,
// } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  //   constructor() {} // private http: HttpHealthIndicator, // private health: HealthCheckService,

  @Get()
  @HttpCode(200)
  check() {
    return 'Hello world';
  }
}
