import { Node } from "./Node";
const ReaddirSync = Node.FileSystem.ReaddirSync;

const files: string[] = [];
const readdir = new ReaddirSync(".", files, { withLastModifTime: true });
console.log(readdir.run().recurse().digest());
