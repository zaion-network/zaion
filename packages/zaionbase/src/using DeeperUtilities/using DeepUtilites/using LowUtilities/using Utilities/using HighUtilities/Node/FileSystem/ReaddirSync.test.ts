import { ReaddirSync } from "./ReaddirSync";

const files: string[] = [];
const readdir = new ReaddirSync(".", files, { withLastModifTime: true });
console.log(readdir.run().recurse().digest());
