import { Sample } from "../AbletonProjectParser/Sample";
import { Utilities } from "../../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/Utilities";
import { AbletonInstrumentsCommon } from "../Device";
import { DrumBranch } from "../DrumBranch";
import { FileRef } from "../FileRef";
import { BranchSourceContext } from "../SourceContext";
const ensureArray = Utilities.ArrayUtils.ensureArray;

export interface GroupDevices {
  IsBranchesListVisible: unknown;
  IsReturnBranchesListVisible: unknown;
  IsRangesEditorVisible: unknown;
  AreDevicesVisible: unknown;
  ["MacroControls.0"]: unknown;
  ["MacroControls.1"]: unknown;
  ["MacroControls.2"]: unknown;
  ["MacroControls.3"]: unknown;
  ["MacroControls.4"]: unknown;
  ["MacroControls.5"]: unknown;
  ["MacroControls.6"]: unknown;
  ["MacroControls.7"]: unknown;
  ["MacroDisplayNames.0"]: unknown;
  ["MacroDisplayNames.1"]: unknown;
  ["MacroDisplayNames.2"]: unknown;
  ["MacroDisplayNames.3"]: unknown;
  ["MacroDisplayNames.4"]: unknown;
  ["MacroDisplayNames.5"]: unknown;
  ["MacroDisplayNames.6"]: unknown;
  ["MacroDisplayNames.7"]: unknown;
  ["MacroDefaults.0"]: unknown;
  ["MacroDefaults.1"]: unknown;
  ["MacroDefaults.2"]: unknown;
  ["MacroDefaults.3"]: unknown;
  ["MacroDefaults.4"]: unknown;
  ["MacroDefaults.5"]: unknown;
  ["MacroDefaults.6"]: unknown;
  ["MacroDefaults.7"]: unknown;
  ["MacroAnnotations.0"]: unknown;
  ["MacroAnnotations.1"]: unknown;
  ["MacroAnnotations.2"]: unknown;
  ["MacroAnnotations.3"]: unknown;
  ["MacroAnnotations.4"]: unknown;
  ["MacroAnnotations.5"]: unknown;
  ["MacroAnnotations.6"]: unknown;
  ["MacroAnnotations.7"]: unknown;
  ["ForceDisplayGenericValue.0"]: unknown;
  ["ForceDisplayGenericValue.1"]: unknown;
  ["ForceDisplayGenericValue.2"]: unknown;
  ["ForceDisplayGenericValue.3"]: unknown;
  ["ForceDisplayGenericValue.4"]: unknown;
  ["ForceDisplayGenericValue.5"]: unknown;
  ["ForceDisplayGenericValue.6"]: unknown;
  ["ForceDisplayGenericValue.7"]: unknown;
  AreMacroControlsVisible: unknown;
  IsAutoSelectEnabled: unknown;
  ChainSelector: unknown;
  ChainSelectorRelativePosition: unknown;
  ViewsToRestoreWhenUnfolding: unknown;
  ReturnBranches: unknown;
  BranchesSplitterProportion: unknown;
  ShowBranchesInSessionMixer: unknown;
  ["MacroColorIndex.0"]: unknown;
  ["MacroColorIndex.1"]: unknown;
  ["MacroColorIndex.2"]: unknown;
  ["MacroColorIndex.3"]: unknown;
  ["MacroColorIndex.4"]: unknown;
  ["MacroColorIndex.5"]: unknown;
  ["MacroColorIndex.6"]: unknown;
  ["MacroColorIndex.7"]: unknown;
  LockId: unknown;
  LockSeal: unknown;
  ChainsListWrapper: unknown;
  ReturnChainsListWrapper: unknown;
  ChainSelectorFilterMidiCtrl: unknown;
  RangeTypeIndex: unknown;
  ShowsZonesInsteadOfNoteNames: unknown;
  IsMidiSectionVisible: unknown;
  AreSendsVisible: unknown;
  ArePadsVisible: unknown;
  PadScrollPosition: unknown;
  DrumPadsListWrapper: unknown;
  VisibleDrumPadsListWrapper: unknown;
}

export interface DrumGroupDevice
  extends AbletonInstrumentsCommon,
    GroupDevices {
  Branches: { DrumBranch: DrumBranch | DrumBranch[] };
}

type Keys = keyof DrumGroupDevice;

export class DrumGroupDevice {
  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }
  #fileref: FileRef | undefined;
  get samples() {
    this.Branches.DrumBranch = ensureArray(this.Branches.DrumBranch);
    return this.Branches.DrumBranch.map((db) => {
      let sourcecontextvalue = db.SourceContext.Value;
      if (sourcecontextvalue !== "") {
        this.#fileref = new FileRef(
          sourcecontextvalue.SourceContext.OriginalFileRef.FileRef
        );
        this.#fileref.RelativePath.RelativePathElement = ensureArray(
          this.#fileref.RelativePath.RelativePathElement
        );
        return this.#makeSample();
      }
    }).filter(Boolean) as Sample[];
  }

  #makeSample(): Sample {
    return {
      type: this.#fileref!.pathtype,
      filepath: this.#fileref!.filepath,
      filename: this.#fileref!.filename,
    };
  }
}
