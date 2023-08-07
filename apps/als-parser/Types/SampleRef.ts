import { Value } from "./Attributes";
import { FileRef } from "./FileRef";

export interface SampleRef {
  FileRef: FileRef;
  LastModDate: Value;
  SourceContext: unknown;
  SampleUsageHint: Value;
  DefaultDuration: Value;
  DefaultSampleRate: Value;
}
