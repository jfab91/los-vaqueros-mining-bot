import { WorkerStatus } from './worker-status.interface';

export interface GetWorkers {
  error: any;
  result: WorkerStatus[]
}