import { FormatUtils } from '../utils/format.utils';
import { Template } from './template';

export class OfflineTemplate extends Template {
  constructor (data: { workerName: string, lastSeen: number }) {
    super(data);
  }

  public getMessage(): string {
    const { workerName, lastSeen } = this.data;
    return (
      `El worker *${workerName}* está *OFFLINE* 🚨 \n` +
      `Ésta fue la última vez que estuvo conectado: ${FormatUtils.convertTimeStampToDate(lastSeen)}` 
    );
  }
}