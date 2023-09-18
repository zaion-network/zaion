import { SrcCodeNode } from "../SrcCodeNode";

export interface SrcCodeRulesTree {
  [k: SrcCodeNode["value"]]: SrcCodeRulesTree | {};
}
export class SrcCodeRulesTree {}
