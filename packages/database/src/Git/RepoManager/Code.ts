import { Blob } from "./Graph/extensions/Node/extensions/Blob/Blob";

export class Code extends Blob {
  kind = "code" as const;
  dependencies: any;
}

export class Repo_Function extends Code {}
export class Repo_Hook extends Code {}
export class Repo_Styled extends Code {}
export class Repo_Class extends Code {}
export class Repo_Component extends Code {}
