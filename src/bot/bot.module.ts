import { Module } from '@nestjs/common';
import { BotProvider } from './providers/bot.provider';
import { BotService } from './bot.service';

@Module({
  providers: [BotProvider, BotService],
  exports: [BotService],
})
export class BotModule {}
