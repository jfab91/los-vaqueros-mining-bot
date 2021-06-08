import { ICounter } from '../interfaces/counter.interface';

export class OfflineCounter implements ICounter {
  private _count: number;
  private max: number;

  constructor() {
    this._count = 0;
    this.max = 3;
  }

  public increment(): void {
    this._count += 1;
  }
  
  public reachedMax(): boolean {
    return this._count >= this.max;
  }

  public reset(): void {
    this._count = 0;
  }
}