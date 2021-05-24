/* eslint-disable @typescript-eslint/camelcase */

import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_INJECTION_TOKEN, TELEGRAM_CHAT_ID } from '../shared/constants';


@Injectable()
export class BotService {
  constructor(@Inject(TELEGRAM_BOT_INJECTION_TOKEN) private readonly bot: TelegramBot) {}
  
  respond(): void {
    this.bot.onText(/\/echo (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const resp = match[1];

      this.bot.sendMessage(chatId, resp);
    });
  }

  send(text: string): void {
    this.bot.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: 'Markdown'});
  }
}
