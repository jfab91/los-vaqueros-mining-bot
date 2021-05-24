import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { BotService } from '../../bot/bot.service';
import { ResumedWorkerStatus } from '../interfaces/resumed-worker-status.interface';
import { GET_WORKERS_ENDPOINT } from '../../shared/constants';
import { WorkerStatus } from '../interfaces/worker-status.interface';


@Injectable()
export class StatsService {
  constructor(private readonly botService: BotService) {}

  private logger: Logger = new Logger(StatsService.name);

  async getWorkerStatus(name: string): Promise<ResumedWorkerStatus> {
    try {
      const response = await axios.get(GET_WORKERS_ENDPOINT);
      const worker = response.data.result.find((worker: WorkerStatus) => worker.name === name);

      if (!worker) {
        throw Error('No worker found with the name provided');
      }

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

  async sendCurrentWorkerStatus(name: string) {
    const workerStatus = await this.getWorkerStatus(name);
    const text = 
    `Estas son las estadísticas actuales del worker *${workerStatus.name}* 🤠 \n\n` +
    `*Estado:* ${this.setOnlineStatusMessage(workerStatus)} \n` +
    `*Hashrate reportado:* ${this.formatHashRate(workerStatus.reportedHashRate)} \n` +
    `*Hashrate efectivo:* ${this.formatHashRate(workerStatus.effectiveHashRate)} \n` +
    `*Último momento activo:* ${this.convertTimeStampToDate(workerStatus.lastSeen)}`;

    this.botService.send(text);
  }

  private setOnlineStatusMessage(workerStatus: ResumedWorkerStatus): string {
    return !workerStatus.online ? `Apagado 😢` : `Encendido 😎`;
  }

  private convertTimeStampToDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString()
  }

  private formatHashRate(hashrate: number): string {
    return `${(hashrate / 1000000).toFixed(2)} MH/s`;
  }
}
