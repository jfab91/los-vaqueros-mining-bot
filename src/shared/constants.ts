import * as dotenv from 'dotenv';

dotenv.config();

// Telegram 
export const TELEGRAM_TOKEN = `${process.env.TELEGRAM_TOKEN}`;
export const TELEGRAM_CHAT_ID = `${process.env.TELEGRAM_CHAT_ID}`;
export const TELEGRAM_BOT_INJECTION_TOKEN = 'TELEGRAM_BOT';

// ETH wallet
export const WALLET_ADDRESS = `${process.env.WALLET_ADDRESS}`;

// Worker Names
export const WORKER_NAMES = (`${process.env.WORKER_NAMES}`).split(',');

// Flexpool Endpoints

const formatWorkersEndpoint = () => {
  const variable = `${process.env.GET_WORKERS_ENDPOINT}`;

  return variable.replace('<wallet>', `${WALLET_ADDRESS}`)
}

export const GET_WORKERS_ENDPOINT = `${formatWorkersEndpoint()}`;
