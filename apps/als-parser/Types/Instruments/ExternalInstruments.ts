import { AbletonInstrumentsCommon } from "../Device";

export interface ProxyInstrumentDevice extends AbletonInstrumentsCommon {
  LatencyValue: string;
  OutputHelper: string;
  InputHelper: string;
}
