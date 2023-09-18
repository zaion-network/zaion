export abstract class AbstractRepo {
  type: "monorepo" | "repo" | "remote" = "repo";
  packagejson: any;
}
