import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ResumedWorkerStatus } from '../../shared/interfaces/resumed-worker-status.interface';
import { GET_WORKERS_ENDPOINT, ETHEREUM_USD_PRICE_ENDPOINT, GET_MINER_BALANCE_ENDPOINT } from '../../shared/constants';
import { WorkerStatus } from '../interfaces/worker-status.interface';
import { FormatUtils } from '../../shared/utils/format.utils';


@Injectable()
export class StatsService {
  private logger: Logger = new Logger(StatsService.name);

  async getWorkerStatus(name: string): Promise<ResumedWorkerStatus> {
    try {
      const response = await axios.get(GET_WORKERS_ENDPOINT);
      const worker = response.data.result.find((worker: WorkerStatus) => worker.name === name);

      if (!worker) return null;

      return { 
        name: worker.name, 
        online: worker.online, 
        reportedHashRate: worker.reported_hashrate,
        effectiveHashRate: worker.effective_hashrate,
        lastSeen: worker.last_seen,
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getETHBalance(): Promise<number> {
    try {
      const response: AxiosResponse<MinerBalanceResponse> = await axios.get(GET_MINER_BALANCE_ENDPOINT);
      const { error, result } = response.data;

      if (response.data.error) {
        throw new Error(error as string)
      }

      return FormatUtils.formatEthBalance(result);

    } catch (error) {
      this.logger.error(error);
    }
  }
  
  async getEthereumUSDValue(): Promise<number> {
    try {
      return (await axios.get(ETHEREUM_USD_PRICE_ENDPOINT) as AxiosResponse<EthereumPriceResponse>).data?.ethereum?.usd
    } catch (error) {
      this.logger.error(error);
    }
  }
}

type EthereumPriceResponse = {
  ethereum: { usd: number };
}

type MinerBalanceResponse = {
  error: unknown;
  result: number;
}
