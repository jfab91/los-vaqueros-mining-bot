import { Module } from '@nestjs/common';
import { BotProvider } from './providers/bot.provider';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  providers: [BotProvider, BotService],
  controllers: [BotController],
  exports: [BotService],
})
export class BotModule {}
