import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BotModule } from './bot/bot.module';
import { StatsModule } from './stats/stats.module';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BotModule, 
    StatsModule, SharedModule
  ],
  controllers: [AppController],
})
export class AppModule {}
