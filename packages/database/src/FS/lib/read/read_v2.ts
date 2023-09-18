import { readdirSync } from "fs";

export type read_v2Props = "read_v2Props";

export function read_v2(
  folder: string,
  filetypes: boolean = false
): string[] | undefined {
  {
    let options = undefined;
    if (filetypes) options = { withFileTypes: filetypes };
    if (!options)
      return readdirSync(folder)
        .filter((ent) => ent[0] !== ".")
        .filter((ent) => ent !== "giacomo");
  }
}
