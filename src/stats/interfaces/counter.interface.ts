export interface ICounter {
  increment(): void;
  reachedMax(): boolean;
  reset(): void;
}