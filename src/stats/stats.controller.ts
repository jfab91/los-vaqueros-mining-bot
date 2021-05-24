import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { StatsService } from './services/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('worker/status')
  getWorkerStatus(@Query('name') name: string) {
    const worker = this.statsService.getWorkerStatus(name);

    if (!worker) {
      return new NotFoundException('there is no worker with the name provided');
    }

    return worker;
  }
}
