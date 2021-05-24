import { TELEGRAM_BOT_INJECTION_TOKEN, TELEGRAM_TOKEN } from '../../shared/constants';
import * as TelegramBot from 'node-telegram-bot-api';

export const BotProvider = {
  provide: TELEGRAM_BOT_INJECTION_TOKEN,
  useValue: new TelegramBot(TELEGRAM_TOKEN, { polling: true })
}