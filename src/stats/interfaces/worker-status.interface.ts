export interface WorkerStatus {
  name: string;
  onine: boolean;
  duplicate_workers_merged: number;
  reported_hashrate: number;
  effective_hashrate: number;
  valid_shares: number;
  stale_shares: number;
  invalid_shares: number;
  last_seen: number;
}