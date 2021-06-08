import { Template } from './template';

export class BackToOnlineTemplate extends Template {
  constructor (data: { workerName: string }) {
    super(data);
  }

  public getMessage(): string {
    const { workerName } = this.data;
    return (
      `El worker *${workerName}* volvió a estar *ONLINE* ✅ \n` 
    );
  }
}