import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('ping')
  async getPing() {
    return HttpStatus.OK
  }
}
