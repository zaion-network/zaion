import fs from "fs";
import { join } from "path";

export const writeFile_v1 = async function (
  path: string,
  data: string,
  extension?: string
) {
  let file_path;
  if (extension) file_path = join(path, extension);
  else file_path = path;
  fs.writeFileSync(file_path, data);
  process.stdout.write("Written file: " + path + "\n");
};
