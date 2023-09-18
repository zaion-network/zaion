import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

type filename = string;
export function backup_v1(backup: [string, string, filename]) {
  const stringed = JSON.stringify(backup[1]);
  const backupFolder = join(process.cwd(), "backup");
  const packorappFolder = join(process.cwd(), "backup", backup[0]);
  if (!existsSync(backupFolder)) mkdirSync(backupFolder);
  if (!existsSync(packorappFolder)) mkdirSync(packorappFolder);
  writeFileSync(join(backupFolder, backup[0], backup[2]), stringed);
}
