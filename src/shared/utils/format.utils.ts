export class FormatUtils {
  public static formatHashRate(hashrate: number): number {
    return Number((hashrate / 1000000).toFixed(2));
  }

  public static convertTimeStampToDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString()
  }

  public static formatEthBalance(balance: number): number {
    return Number((balance / 1000000000000000000).toFixed(6));
  }

  public static formatUSDBalance(balance: number, price: number): number {
    return Number((balance * price).toFixed(2));
  }
}