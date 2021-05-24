import { Injectable, Logger } from '@nestjs/common';
import { StatsService } from './stats.service';
import { WORKER_NAMES } from '../../shared/constants';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobsService {
  private logger: Logger = new Logger(JobsService.name);

  constructor(private readonly statsService: StatsService) {}
  
  @Cron(CronExpression.EVERY_5_MINUTES)
  async dailyNotification(): Promise<void> {
    for (const name of WORKER_NAMES) {
      await this.statsService.sendCurrentWorkerStatus(name);
      this.logger.debug(`status report was sent at ${new Date().toISOString()}`)
    }
  }
}
