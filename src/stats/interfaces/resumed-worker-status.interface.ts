export interface ResumedWorkerStatus {
  name: string, 
  online: boolean, 
  reportedHashRate: number,
  effectiveHashRate: number,
  lastSeen: number,
}