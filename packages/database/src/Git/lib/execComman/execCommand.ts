import util from "util";

export async function execCommand(command: string) {
  const exec = util.promisify(
    require("node:child_process").exec
  );
  const { stdout, stderr } = await exec(command);
  if (stderr) return stderr;
  else return stdout;
}
