import { Injectable, Logger } from '@nestjs/common';
import { StatsService } from './stats.service';
import { WORKER_NAMES } from '../../shared/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfflineTemplate } from '../../shared/classes/offline-template';
import { BotService } from '../../bot/bot.service';
import { DailyReportTemplate } from '../../shared/classes/daily-report-template';

@Injectable()
export class JobsService {
  private logger: Logger = new Logger(JobsService.name);

  constructor(
    private readonly statsService: StatsService,
    private readonly bot: BotService
  ) {}
  
  /**
   * This job will check the status of each worker and it will send a report everyday at 8:00 am
   */
  @Cron('0 8 * * *')
  async dailyReport(): Promise<void> {
    for (const name of WORKER_NAMES) {
      const worker = await this.statsService.getWorkerStatus(name);

      if (worker) {
        this.bot.send(new DailyReportTemplate(worker).getMessage());
        this.logger.debug(`daily report for worker ${name} was sent`);
      }
    }
  }
  /**
   * This job is constantly checking the online status of the workers, it will notify only if there is any worker offline
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async checkOnlineStatus(): Promise<void> {
    for (const name of WORKER_NAMES) {
      const worker = await this.statsService.getWorkerStatus(name);

      if (worker && !worker.online) {
        this.bot.send(new OfflineTemplate({ name: worker.name, lastSeen: worker.lastSeen}).getMessage());
        this.logger.debug(`worker ${name} is offline!!`);
      }
    }
  }
}
