import { Template } from "./template";
import { ResumedWorkerStatus } from '../interfaces/resumed-worker-status.interface';
import { FormatUtils } from "../utils/format.utils";
import { GREETINGS_NAME } from "../constants";

export class DailyReportTemplate extends Template {
  constructor (data: ResumedWorkerStatus) {
    super(data);
  }

  public getMessage(): string {
    const { name, online, reportedHashRate, effectiveHashRate, lastSeen } = this.data;
    return (
      `Buenos Días 🌞 ${GREETINGS_NAME} \n\n` +
      `Estas son las estadísticas actuales del worker *${name}* 🤠 \n\n` +
      `*Estado:* ${online ? `Encendido 😎` : `Apagado 😢`} \n` +
      `*Hashrate reportado:* ${FormatUtils.formatHashRate(reportedHashRate)} \n` +
      `*Hashrate efectivo:* ${FormatUtils.formatHashRate(effectiveHashRate)} \n` +
      `*Último momento activo:* ${FormatUtils.convertTimeStampToDate(lastSeen)}`
    );
  }
}