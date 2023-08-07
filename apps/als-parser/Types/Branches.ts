import { DrumBranch } from "./DrumBranch";
import { InstrumentBranch } from "./InstrumentBranch";

export interface Branches {
  DrumBranch?: DrumBranch | DrumBranch[];
  InstrumentBranch?: InstrumentBranch | InstrumentBranch[];
}
