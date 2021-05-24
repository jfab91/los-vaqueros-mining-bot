import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ResumedWorkerStatus } from '../../shared/interfaces/resumed-worker-status.interface';
import { GET_WORKERS_ENDPOINT } from '../../shared/constants';
import { WorkerStatus } from '../interfaces/worker-status.interface';


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
}
