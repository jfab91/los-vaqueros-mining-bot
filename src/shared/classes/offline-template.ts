import { Template } from './template';

export class OfflineTemplate extends Template {
  constructor (data: { name: string, lastSeen: number }) {
    super(data);
  }

  public getMessage(): string {
    return (
      `El worker ${this.data.name} está apagado 🚨 \n` +
      `Ésta fue la última vez que estuvo conectado: ${this.data.lasSeen}` 
    );
  }
}