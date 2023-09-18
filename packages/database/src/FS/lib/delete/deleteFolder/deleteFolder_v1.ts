import fs from "fs";

export async function deleteFolder_v1(path: string) {
  fs.rmSync(path, { recursive: true, force: true });
  console.log("Folder deleted at this path: " + path);
}
