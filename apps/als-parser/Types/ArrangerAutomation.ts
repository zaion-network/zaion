import { Value } from "./Attributes";
import { Events } from "./Events";

export interface AutomationTransformViewState {
  IsTransformPending: Value;
  TimeAndValueTransforms: unknown;
}

export interface ArrangerAutomation {
  Events: Events | "";
  AutomationTransformViewState: AutomationTransformViewState;
}
