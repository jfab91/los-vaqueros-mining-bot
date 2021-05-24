import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './services/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('worker/status')
  getWorkerStatus(@Query('name') name: string) {
    return this.statsService.sendCurrentWorkerStatus(name);
  }
}
