import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BotModule } from './bot/bot.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BotModule, 
    StatsModule
  ],
})
export class AppModule {}
