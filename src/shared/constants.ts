import * as dotenv from 'dotenv';

dotenv.config();

// App Settings
export const PORT = `${Number(process.env.PORT) || 3000}`

// Telegram 
export const TELEGRAM_TOKEN = `${process.env.TELEGRAM_TOKEN}`;
export const TELEGRAM_CHAT_ID = `${process.env.TELEGRAM_CHAT_ID}`;
export const TELEGRAM_BOT_INJECTION_TOKEN = 'TELEGRAM_BOT';

// ETH wallet
export const WALLET_ADDRESS = `${process.env.WALLET_ADDRESS}`;

// Worker Names
export const WORKER_NAMES = (`${process.env.WORKER_NAMES}`).split(',');

// Greetings Name
export const GREETINGS_NAME = `${process.env.GREETINGS_NAME}`;

// Flexpool Endpoints

const formatEndpoint = (endpoint: string) => `${endpoint}`.replace('<wallet>', `${WALLET_ADDRESS}`);

export const GET_WORKERS_ENDPOINT = `${formatEndpoint(process.env.GET_WORKERS_ENDPOINT)}`;
