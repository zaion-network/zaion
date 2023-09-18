import { tester } from "@zaionstate/zaionbase";
import { Git, ZaionGit } from "./ZaionGit";

tester(() => {
  const result = ZaionGit.execGit({
    command: "log",
    // args: ["newtagfrombwoy"],
    flags: [
      [
        Git.flags.format,
        `'{"id"="%H"| "tree"="%T"| "refs"="'%D'"| "parents"=["%P"]}'`,
      ],
      // [Git.flags.all],
      // [Git.flags.reflog],
    ],
  });
  // JSON.parse(
  //   execSync(`sh src/Git/ZaionGit/getCommitTree.sh`, { encoding: "utf-8" })
  // )
  console.log(
    JSON.parse(
      `[${result
        .split("\n")
        .map(e =>
          e.split(`|`).map(e => {
            if (e.includes(`refs`)) {
              e = e
                .trim()
                .split(`=`)
                .map(e => {
                  if (e.includes(`, `))
                    e = `[${e
                      .replaceAll(`"`, ``)
                      .split(`, `)
                      .map(e => `"${e}"`)
                      .join(`, `)}]`;
                  return e;
                })
                .join("=");
            }
            return e;
          })
        )
        .join(",\n")
        .replaceAll(`=`, `:`)}]`
    )
  );
})(false);

tester(() => {
  const checkout: Git.Checkout.checkout = o => {
    o.detach;
  };
  checkout({ detach: true, branch_to_detach: "any" });
  checkout({ detach: true });
  checkout({ b: true, newBranch: "" });
  checkout({ b: true, newBranch: "any" });
  checkout({ B: true, newBranch: "any" });
  checkout({ orphan: true, newBranch: "any", startPoint: "here" });
  checkout({ commit: "", detach: true });
})(false);

tester(() => {
  const stash: Git.Stash.stash = ops => {};
  stash({
    sub: Git.Stash.subcommands.list,
    log_options: Git.Log.options.follow,
  });
  stash({ sub: Git.Stash.subcommands.drop, q: true, stash: "" });
  stash({ sub: Git.Stash.subcommands.pop, q: true, index: true, stash: "" });
  stash({ sub: Git.Stash.subcommands.apply, q: true, index: true, stash: "" });
  stash({ sub: Git.Stash.subcommands.branch, branchname: "b_name", stash: "" });
})(false);

tester(() => {
  const add: Git.Add.add = opts => {};
  add({
    verbose: true,
    dryRun: true,
    target: "all",
    pathspecFromFile: { type: "fromFile", file: "" },
    path: "",
  });
})(false);

tester(() => {
  const commit: Git.Commit.commit = ops => {};
  commit({ source: "all", u: { mode: "all", type: "untrackedMode" } });
  commit({ source: "interactive" });
  commit({
    u: "untracked",
    amend: true,
    rebase: { type: "squash", commit: "commit" },
  });
})(false);

tester(() => {
  const merge: Git.Merge.merge = ops => {};
  merge({ edit: "no-edit", strategy: "recursive", branch: "1231af" });
  merge({ branch: "ciao" });
})(false);

const git = new Git();
tester(() => {
  git.add({ path: "./zaion.ts", verbose: true });
})(true);

tester(() => {
  git.checkout({ branch: "that-branch" });
  git.checkout({ detach: true });
})(true);

tester(() => {
  git.commit({ message: "il mio messaggio" });
})(true);

tester(() => {
  git.merge({ branch: "my-branch" });
})(true);
