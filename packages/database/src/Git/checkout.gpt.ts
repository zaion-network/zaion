interface CheckoutOptions {
  q?: boolean;
  f?: boolean;
  m?: boolean;
  detach?: boolean;
  b?: string;
  B?: string;
  orphan?: string;
  ours?: boolean;
  theirs?: boolean;
  conflict?: string;
  p?: boolean;
  startBranch?: string;
  commitOrBranch?: string;
  treeIsh?: string;
  pathspec?: string[];
  pathspecFromFile?: string;
  pathspecFileNul?: boolean;
}

class GitInterface {
  // ... (metodi precedenti)

  async checkout(options: CheckoutOptions): Promise<string> {
    let command = "checkout";

    if (options.q) command += " -q";
    if (options.f) command += " -f";
    if (options.m) command += " -m";
    if (options.detach) command += " --detach";
    if (options.b) command += ` -b ${options.b}`;
    if (options.B) command += ` -B ${options.B}`;
    if (options.orphan) command += ` --orphan ${options.orphan}`;
    if (options.ours) command += " --ours";
    if (options.theirs) command += " --theirs";
    if (options.conflict) command += ` --conflict=${options.conflict}`;
    if (options.p) command += " -p";
    if (options.startBranch) command += ` ${options.startBranch}`;
    if (options.commitOrBranch) command += ` ${options.commitOrBranch}`;
    if (options.treeIsh) command += ` ${options.treeIsh}`;
    if (options.pathspec) command += ` -- ${options.pathspec.join(" ")}`;
    if (options.pathspecFromFile) {
      command += ` --pathspec-from-file=${options.pathspecFromFile}`;
      if (options.pathspecFileNul) command += "--pathspec-file-nul";
    }

    return this.runGitCommand(command);
  }
  runGitCommand = (mess: string) => {
    console.log(mess);
    return "done";
  };
}

// Esempio di utilizzo
async function main() {
  const gitInterface = new GitInterface();

  try {
    const options: CheckoutOptions = {
      q: true,
      b: "new-branch",
      B: "fuck",
      startBranch: "main",
    };

    const result = await gitInterface.checkout(options);
    console.log("Risultato del checkout:", result);
  } catch (error) {
    console.error("Errore durante il checkout:", error);
  }
}

main();
