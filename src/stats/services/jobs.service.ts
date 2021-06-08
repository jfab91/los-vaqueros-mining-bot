import { Inject, Injectable, Logger } from '@nestjs/common';
import { StatsService } from './stats.service';
import { WORKER_NAMES } from '../../shared/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfflineTemplate } from '../../shared/classes/offline-template';
import { BotService } from '../../bot/bot.service';
import { DailyReportTemplate } from '../../shared/classes/daily-report-template';
import { RigBalanceInfo } from '../../shared/interfaces/rig-balance-info.interface';
import { MESSAGE_COUNTER_PROVIDER } from '../stats-constants';
import { MessageCounter } from '../classes/message-counter';
import { ResumedWorkerStatus } from '../../shared/interfaces/resumed-worker-status.interface';
import { ICounter } from '../interfaces/counter.interface';
import { BackToOnlineTemplate } from '../../shared/classes/back-to-online-template';

@Injectable()
export class JobsService {
  private logger: Logger = new Logger(JobsService.name);

  constructor(
    private readonly statsService: StatsService,
    private readonly bot: BotService,
    @Inject(MESSAGE_COUNTER_PROVIDER) private readonly messageCounter: MessageCounter,
  ) {}
  
  /**
   * This job will check the status of each worker and it will send a report everyday at 8:00 am
   */
  @Cron('0 8 * * *')
  async dailyReport(): Promise<void> {
    for (const name of WORKER_NAMES) {
      const worker = await this.statsService.getWorkerStatus(name);
      const balanceInfo: RigBalanceInfo = {
        balance: await this.statsService.getETHBalance(),
        ethPrice: await this.statsService.getEthereumUSDValue()
      };

      if (worker) {
        this.bot.send(new DailyReportTemplate({ ...worker, ...balanceInfo}).getMessage());
        this.logger.debug(`daily report for worker ${name} was sent`);
      }
    }
  }
  /**
   * This job is constantly checking the online status of the workers, it will notify only if there is any worker offline
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async checkOnlineStatus(): Promise<void> {
    const { offline } = this.messageCounter;

    for (const name of WORKER_NAMES) {
      const worker = await this.statsService.getWorkerStatus(name);

      if (worker) {
        if (!worker.online) {
          this.sendOfflineMessage(worker, offline);
          this.logger.debug(`worker ${name} is offline!!`);
        }

        this.sendBackToOnlineMessage(worker, offline);
      }
    }
  }

  private sendOfflineMessage(worker: ResumedWorkerStatus, counter: ICounter) {
    if (!counter.reachedMax()) {
      this.bot.send(new OfflineTemplate({ workerName: worker.name, lastSeen: worker.lastSeen}).getMessage());
    }
  }

  private sendBackToOnlineMessage(worker: ResumedWorkerStatus, counter: ICounter) {
    if (counter.reachedMax()) {
      this.bot.send(new BackToOnlineTemplate({ workerName: worker.name }).getMessage());
      counter.reset();
    }
  }
}
