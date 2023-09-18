import { execSync } from "child_process";

declare module "./ZaionGit" {
  interface Commit {
    id: string;
    tree: string;
    parents: string[];
  }
  interface Blob {
    hash: string;
  }
  interface Tag {
    id: string;
  }
  interface Tree {
    id: string;
  }

  interface makeCommitsTree {
    (): Commit[];
  }

  ////
  interface Branch {
    commit: string;
  }
  interface Checkout {
    branch: Branch;
    untrackedChanged: string[];
    addedChanges: Blob[];
  }
  interface CommitTree {}
  interface MergeCommitTree {}
  interface Stash {}
  interface Change {}
  interface File {}
  interface Folder {}

  namespace Git {
    interface Git {}
    namespace Checkout {
      interface CommonOptions {
        q?: boolean;
        f?: boolean;
        m?: boolean;
      }

      interface StartPoint {
        startPoint?: string;
      }

      type Options<D, b, B, O, C> = D extends true
        ? {
            detach: true;
            branch?: string;
            branch_to_detach?: string;
            commit?: string;
          }
        : b extends true
        ? {
            detach?: D;
            branch?: string;
            newBranch: string;
            b: true;
          } & StartPoint
        : B extends true
        ? {
            detach?: D;
            branch?: string;
            newBranch: string;
            B: true;
          } & StartPoint
        : O extends true
        ? {
            detach?: D;
            branch?: string;
            newBranch: string;
            orphan: true;
          } & StartPoint
        : C extends string
        ? { detach?: true; branch?: string; commit: string }
        : {
            detach?: D;
            b?: b;
            B?: B;
            orphan?: O;
            commit?: C;
            branch?: string;
          };

      interface checkout {
        <D, b, B, O, C>(o: Options<D, b, B, O, C> & CommonOptions): void;
      }
    }
    namespace Stash {
      type Options<S> = S extends typeof Stash.subcommands.list
        ? { sub: typeof Stash.subcommands.list; log_options: Git.Log.options }
        : S extends typeof Stash.subcommands.show
        ? {
            sub: typeof Stash.subcommands.show;
            untracked?: "include" | "exclude";
            diff_options?: string;
            stash?: string;
          }
        : S extends typeof Stash.subcommands.drop
        ? {
            sub: typeof Stash.subcommands.drop;
            q?: boolean;
            stash?: string;
          }
        : S extends typeof Stash.subcommands.pop
        ? {
            sub: typeof Stash.subcommands.pop;
            q?: boolean;
            index?: boolean;
            stash?: string;
          }
        : S extends typeof Stash.subcommands.apply
        ? {
            sub: typeof Stash.subcommands.apply;
            q?: boolean;
            index?: boolean;
            stash?: string;
          }
        : S extends typeof Stash.subcommands.branch
        ? {
            sub: typeof Stash.subcommands.branch;
            branchname: string;
            stash?: string;
          }
        : { sub?: S };

      interface stash {
        <S>(ops: Options<S>): void;
      }
    }
    namespace Add {
      type Options = {
        verbose?: boolean;
        dryRun?: boolean;
        force?: boolean;
        interactive?: boolean;
        patch?: boolean;
        edit?: boolean;
        target?: "all" | "no-all" | "ignore" | "no-ignore" | "update";
        sparse?: boolean;
        intentToAdd?: boolean;
        refresh?: boolean;
        ignoreErrors?: boolean;
        ignoreMissing?: boolean;
        renormalize?: boolean;
        chmod?: boolean;
        pathspecFromFile?: { type: "fromFile"; file: string } | "fileNull";
        path: string;
      };
      interface add {
        (options: Options): void;
      }
    }
    namespace Commit {
      type Options = {
        source?: "all" | "interactive" | "patch";
        s?: boolean;
        v?: boolean;
        u?:
          | "untracked"
          | { type: "untrackedMode"; mode: "no" | "normal" | "all" };
        amend?: boolean;
        dryRun?: boolean;
        rebase?:
          | { type: "c" | "C" | "squash"; commit: string }
          | {
              type: "fixup";
              amend?: boolean;
              reword?: boolean;
              commit: string;
            }
          | { type: "file"; file: string }
          | { type: "message"; message: string };
        resetAuthor?: boolean;
        allowEmpty?: boolean;
        allowEmptyMessage?: boolean;
        noVerify?: boolean;
        e?: boolean;
        author?: string;
        message?: string;
        date?: string;
        cleanUp?: "strip" | "whitespace" | "verbatim" | "scissors" | "default";
        status?: "status" | "no-status";
        inclusion?:
          | { type: "include"; paths: string[] }
          | { type: "only"; paths: string[] };
        pathspecFromFile?: { type: "fromFile"; file: string } | "fileNull";
      };
      interface commit {
        (options: Options): void;
      }
    }
    namespace Merge {
      type Options = {
        n?: boolean;
        stat?: boolean;
        noCommit?: boolean;
        squash?: boolean;
        edit?: "edit" | "no-edit";
        noVerify?: boolean;
        strategy?: "recursive" | "resolve" | "ours" | "octopus" | "subtree";
        unrelatedHistories?: "allow" | "no-allow";
        rerereAutoupdate?: "rerere-autoupdate" | "no-rerere-autoupdate";
        intoName?: string;
        commit?: string | string[];
        branch: string;
        autostash?: "autostash" | "no-autostash";
        progress?: "progress" | "no-progress";
        verbose?: boolean;
        quiet?: boolean;
      };
      interface merge {
        (ops: Options): void;
      }
    }
    namespace Log {}
    namespace Switch {}
    namespace Tag {}
    namespace Status {}
    namespace LsFiles {}
    namespace RevParse {}
    namespace Branch {}
    namespace WorkTree {}
    namespace ForEachRef {}
  }
}
export interface Git {
  add(options: Git.Add.Options): void;
  checkout<D, b, B, O, C>(options: Git.Checkout.Options<D, b, B, O, C>): void;
  commit(options: Git.Commit.Options): void;
  merge(options: Git.Merge.Options): void;
}
export class Git implements Git {
  add(options: Git.Add.Options): void {
    let command = `git add`;
    if (options.verbose) command += ` -v`;
    command += ` ${options.path}`;
    this.runGitCommand(command);
  }
  checkout<D, b, B, O, C>(
    options: Git.Checkout.Options<D, b, B, O, C> & Git.Checkout.CommonOptions
  ): void {
    let command = `git checkout`;
    if (options.detach) command += ` -D`;
    if (options.branch) command += ` ${options.branch}`;
    this.runGitCommand(command);
  }
  commit(options: Git.Commit.Options): void {
    let command = `git commit`;
    if (options.message) command += ` -m '${options.message}'`;
    this.runGitCommand(command);
  }
  merge(options: Git.Merge.Options): void {
    let command = `git merge`;
    command += ` ${options.branch}`;
    this.runGitCommand(command);
  }
  runGitCommand = (message: string) => console.log(message);
}
export namespace Git {
  export enum flags {
    o = "-o",
    exclude_standard = "--exclude-standard",
    show_toplevel = "--show-toplevel",
    abbre_ref = "--abbrev-ref",
    name_status = "--name-status",
    contains = "--contains",
    pretty = "--pretty=",
    format = "--format",
    decorate = "--decorate=",
    all = "--all",
    reflog = "--reflog",
  }
  export enum stashSubCommands {
    list = "list",
    show = "show",
    drop = "drop",
    pop = "pop",
    apply = "pop",
    branch = "pop",
  }
  export enum commands {
    clone = "clone",
    init = "init",
    add = "add", //
    mv = "mv",
    log = "log", //
    switch = "switch", //
    diff = "diff",
    commit = "commit", //
    restore = "restore",
    merge = "merge", //
    rebase = "rebase",
    tag = "tag", //
    status = "status", //
    ls_files = "ls-files", //
    revParse = "rev-parse", //
    branch = "branch", //
    checkout = "checkout", // fatto
    worktree = "worktree", //
    stash = "stash", // fatto
    forEachRef = "for-each-ref", //
  }
  export enum logFormat {
    commitHash = "%H",
    abbreviatedCommitHash = "%h",
    treeHash = "%T",
    abbreviatedTreeHash = "%t",
    parentHashes = "%P",
    abbreviatedParentHashes = "%p",
    authorName = "%an",
    authorEmail = "%ae",
    authorDate = "%ad",
    authorDateUnix = "%at",
    authorDateISO = "%ai",
    authorRelativeDate = "%ar",
    body = "%b",
    committerName = "%cn",
    committerEmail = "%ce",
    committerDate = "%cd",
    committerDateUnix = "%ct",
    committerDateISO = "%ci",
    committerRelativeDate = "%cr",
    refs = "%D",
    refsShort = "%d",
    reflog = "%gD",
    reflogShort = "%gd",
    reflogSubject = "%gs",
    subject = "%s",
  }
  export enum refTypes {
    heads = "heads",
    remotes = "remotes",
    tags = "tags",
    pull = "pull",
    commit = "commit",
    stash = "stash",
    notes = "notes",
    worktrees = "worktrees",
    replace = "replace",
  }
  export enum tagBranchFormat {
    refname = "%(refname)",
    refnameShort = "%(refname:short)",
    object = "%(object)",
    objectname = "%(objectname)",
    committerDateISO = "%(committerdate:iso)",
    committerDateUnix = "%(committerdate:unix)",
    subject = "%(subject)",
    upstream = "%(upstream)",
  }
  export namespace Log {
    export enum options {
      follow = "--follow",
      noDecorate = "",
      decorateRefs = "",
      decorateRefsExclude = "",
      clearDecorations = "",
      source = "",
      mailMap = "",
      no_mailMap = "",
      useMailMap = "",
      no_useMailMap = "",
      fullDiff = "",
      logSize = "",
    }
  }
  export namespace Stash {
    export enum subcommands {
      list = "list",
      show = "show",
      drop = "drop",
      pop = "pop",
      apply = "apply",
      branch = "branch",
      save = "save",
      clear = "clear",
      create = "create",
      store = "store",
    }
  }
}
enum checkOutTypes {
  one = "one",
  all = "all",
}
enum addTypes {
  one = "one",
  all = "all",
}
enum removeTypes {
  one = "one",
  all = "all",
}
enum commitTypes {
  single = "single",
  multi = "multi",
}
export interface ZionGit {
  checkout<T extends checkOutTypes>(type: T, target: string): this;
  add<T extends addTypes>(type: T): this;
  remove<T extends removeTypes>(type: T): this;
  commit(type: commitTypes): this;
}
export class ZaionGit {
  #cwd: string = process.cwd();
  get cwd() {
    return this.#cwd;
  }
  constructor() {}
}

export namespace ZaionGit {
  export const execGit = ({
    command,
    flags,
    args,
  }: {
    command: string;
    flags?: ([Git.flags, string] | [Git.flags])[];
    args?: string[];
  }) => {
    enum states {
      no_args__no_flags,
      no_args__w_flags,
      w_args__no_flags,
      w_args__w_flags,
    }
    const checkFlags = new Map();
    let state: states;
    if (!args && !flags) state = states.no_args__no_flags;
    else if (!args && flags) state = states.no_args__w_flags;
    else if (args && !flags) state = states.w_args__no_flags;
    else state = states.w_args__w_flags;

    const map = new Map();
    map.set(states.no_args__no_flags, () => `git ${command}`);
    map.set(
      states.no_args__w_flags,
      () =>
        `git ${command} ${flags!
          .map(e => {
            if (e.length > 1) {
              const joint = e.join(`=`);
              return joint;
            } else return e[0];
          })
          .join(` `)}`
    );
    map.set(states.w_args__no_flags, () => `git ${command} ${args!.join(` `)}`);
    const commandString = map.get(state);
    // console.log(commandString());

    return execSync(commandString(), {
      encoding: "utf-8",
      cwd: process.cwd(),
    }).trim();
  };
}
