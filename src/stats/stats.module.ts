import { Module } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { StatsService } from './services/stats.service';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [BotModule],
  providers: [JobsService, StatsService],
})
export class StatsModule {}
