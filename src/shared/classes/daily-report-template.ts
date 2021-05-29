import { Template } from "./template";
import { ResumedWorkerStatus, RigBalanceInfo } from '../interfaces';
import { FormatUtils } from "../utils/format.utils";
import { GREETINGS_NAME } from "../constants";

export class DailyReportTemplate extends Template {
  constructor (data: ResumedWorkerStatus & RigBalanceInfo) {
    super(data);
  }

  public getMessage(): string {
    const { name, online, reportedHashRate, effectiveHashRate, lastSeen, balance, ethPrice } = this.data;
    return (
      `Buenos Días 🌞 ${GREETINGS_NAME} \n\n` +
      `Estas son las estadísticas actuales del worker *${name}* 🤠 \n\n` +
      `*Estado:* ${online ? `Encendido 😎` : `Apagado 😢`} \n` +
      `*Hashrate reportado:* ${FormatUtils.formatHashRate(reportedHashRate)} MH/s \n` +
      `*Hashrate efectivo:* ${FormatUtils.formatHashRate(effectiveHashRate)} MH/s \n` +
      `*Último momento activo:* ${FormatUtils.convertTimeStampToDate(lastSeen)} \n\n` + 
      `*Balance en ETH:* ${balance} ETH \n` + 
      `*Precio actual del ETH:* ${ethPrice} USD \n` + 
      `*Balance en USD:* ${FormatUtils.formatUSDBalance(balance, ethPrice)} USD`
    );
  }
}