import { ExecSync } from "./ExecSync";

const exe = new ExecSync("ls", { maxBuffer: 1024 });
exe.run().format().split(ExecSync.splitters.newline);

console.log(exe.digest());
