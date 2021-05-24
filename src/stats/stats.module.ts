import { Module } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { StatsService } from './services/stats.service';
import { BotModule } from '../bot/bot.module';
import { StatsController } from './stats.controller';

@Module({
  imports: [BotModule],
  providers: [JobsService, StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
