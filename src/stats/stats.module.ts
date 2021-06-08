import { Module } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { StatsService } from './services/stats.service';
import { BotModule } from '../bot/bot.module';
import { MessageCounter } from './classes/message-counter';
import { MESSAGE_COUNTER_PROVIDER } from './stats-constants';

@Module({
  imports: [BotModule],
  providers: [
    JobsService, 
    StatsService,
    {
      provide: MESSAGE_COUNTER_PROVIDER,
      useClass: MessageCounter,
    },
  ],
})
export class StatsModule {}
