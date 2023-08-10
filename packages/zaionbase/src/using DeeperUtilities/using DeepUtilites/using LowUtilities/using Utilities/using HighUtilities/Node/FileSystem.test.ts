import { existsSync, writeFileSync } from "fs";
import { FileSystem } from "./FileSystem";
import path from "path";

const checkFileExists = async () => {
  const checkFileExists = FileSystem.checkFileExists;
  const thisfile = path.join(__filename);
  const res = await checkFileExists(thisfile);
  console.log(res);
};
checkFileExists();

const checkAndRemove = () => {
  const filename = "test.txt";
  const filepath = path.join(__dirname, filename);
  const createfile = false;
  if (createfile) writeFileSync(filepath, "testit");
  const checkAndRemove = FileSystem.checkAndRemove;
  const res = checkAndRemove(filepath);
  console.log(res);
};
checkAndRemove();
