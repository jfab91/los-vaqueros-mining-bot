import { FormatUtils } from '../utils/format.utils';
import { Template } from './template';

export class OfflineTemplate extends Template {
  constructor (data: { name: string, lastSeen: number }) {
    super(data);
  }

  public getMessage(): string {
    const { name, lastSeen } = this.data;
    return (
      `El worker *${name}* está *OFFLINE* 🚨 \n` +
      `Ésta fue la última vez que estuvo conectado: ${FormatUtils.convertTimeStampToDate(lastSeen)}` 
    );
  }
}