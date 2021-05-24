export class FormatUtils {
  public static formatHashRate(hashrate: number): string {
    return `${(hashrate / 1000000).toFixed(2)} MH/s`;
  }

  public static convertTimeStampToDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString()
  }
}