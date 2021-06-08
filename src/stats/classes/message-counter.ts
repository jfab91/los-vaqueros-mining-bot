import { ICounter } from '../interfaces/counter.interface';
import { OfflineCounter } from './offline-counter';

export class MessageCounter {
  public offline: ICounter;

  constructor() {
    this.offline = new OfflineCounter();
  }
}