import { Body, Controller, Post } from '@nestjs/common';
import { BotService } from './bot.service';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}
  
  @Post('send')
  send(@Body() dto: SendMessageDto) {
    this.botService.send(dto.text);
  }
}
