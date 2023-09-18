import { execSync } from "../lib/execSync";
import path from "path";
import { statSync } from "fs";
import { Method, HigherUtilities } from "@zaionstate/zaionbase";

declare module "./NewGit.type" {
  enum addTypes {
    stageFile = "stageFile",
  }
  enum splitters {
    slash = "/",
    return = "\n",
    verticalBar = "|",
    doubleVBar = "||",
    minor = "<",
    doubleminor = "<<",
    minorDollar = "<$",
    comma = ",",
    space = " ",
  }

  enum refTypes {
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

  type RefType = keyof typeof refTypes;

  enum GitLogFormat {
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

  enum commitObjectFields {
    refname = "%(refname)",
    refnameShort = "%(refname:short)",
    object = "%(object)",
    objectname = "%(objectname)",
    committerDateISO = "%(committerdate:iso)",
    committerDateUnix = "%(committerdate:unix)",
    subject = "%(subject)",
    upstream = "%(upstream)",
  }

  enum commands {
    status = "status", //
    ls_files = "ls-files", //
    revParse = "rev-parse", //
    log = "log", //
    tag = "tag", //
    branch = "branch", //
    add = "add", //
    commit = "commit", //
    merge = "merge", //
    checkout = "checkout", //
    switch = "switch", //
    worktree = "worktree", //
    stash = "stash", //
    forEachRef = "for-each-ref", //
  }

  enum gitFlags {
    o = "-o",
    exclude_standard = "--exclude-standard",
    show_toplevel = "--show-toplevel",
    abbre_ref = "--abbrev-ref",
    name_status = "--name-status",
    contains = "--contains",
    pretty = "--pretty=",
    format = "--format=",
    decorate = "--decorate=",
    all = "--all",
  }

  enum changesType {
    M = "modified",
    A = "added",
    D = "deleted",
  }

  enum logTypes {
    getCommit = "getCommit",
    hasParentCommit = "hasParentCommit",
    getDirectParentOfCommit = "getDirectParentOfCommit",
    getRawCommit = "getRawCommit",
  }

  enum branchTypes {
    mergeTargets = "mergeTargets",
    getBranch = "getBranch",
    getBranches = "getBranches",
    removeBranch = "removeBranch",
  }

  enum stashTypes {
    makeStashRaw = "makeStashRaw",
  }

  enum forEachRefTypes {
    makeAllRefs = "makeAllRefs",
  }

  enum tagTypes {
    getTags = "getTags",
    addTag = "addTag",
    deleteTag = "deleteTag",
  }

  enum checkoutTypes {
    checkoutBranch = "checkoutBranch",
    checkoutAndCreate = "checkoutAndCreate",
  }

  enum commitTypes {
    commitFile = "commitFile",
  }

  enum mergeTypes {
    merge = "merge",
  }

  enum errors {
    noSuchCommand = "no such command",
    needHead = "need a head",
    wrongType = "wrong type",
    objectSetTrue = "object must be set to true",
    headMustStartRefs = "head must start with refs/",
    noBranch = "no branch",
    noRoot = "no root",
    nameForTag = "a name for the tag must be provided",
    nameForBranch = "must provide a name for the new branch",
    firstArg = `first argument cannot be "checkoutBranch" nor "checkoutAndCreate"`,
    branchArg = "branch argument must be provided",
    typeOfArg2 = "type of arg2 must be string, object or undefined",
  }

  enum classMethods {
    lsFiles = "lsFiles",
    revParse = "revParse",
    log = "log",
    tag = "tag",
    branch = "branch",
    //
    add = "add",
    commit = "commit",
    merge = "merge",
    worktree = "worktree",
    switch = "switch",
    checkout = "checkout",
    stash = "stash",
    forEachRef = "forEachRef",
  }

  type Methods = NewGit.Log.Log &
    NewGit.Branch.Branch &
    NewGit.LsFiles.LsFiles &
    NewGit.RevParse.RevParse &
    NewGit.Tag.Tag &
    NewGit.Add.Add &
    NewGit.Commit.Commit &
    NewGit.Merge.Merge &
    NewGit.Checkout.Checkout &
    NewGit.Stash.Stash &
    NewGit.forEachRef.ForEachRef;

  namespace NewGit {
    namespace Add {
      interface add {
        (type: keyof typeof addTypes, file: string): string;
      }
      interface addExecutor {
        (this: AddHandler, file: string): string;
      }
    }

    namespace Commit {
      interface ParentCommitRaw {
        hash: string;
        date: string;
        message: string;
        refs: string;
        body: string;
        treehash: string;
        author_name: string;
        author_email: string;
      }

      interface CommitRaw {
        hash: string | string[];
        refs: string;
      }

      interface CommitValue {
        hash: string;
        // parents
        parentHashes: string[];
        commitCount: number;
        authorName: string | null;
        authorEmail: string | null;
        commitMessage: string;
        creationDate: Date;
        lastUpdated: Date;
        // changes
        filesChanged: number;
        insertions: number;
        deletions: number;
        changes: {
          added: string[];
          modified: string[];
          deleted: string[];
        };
        // children
        isMerged: boolean;
        mergeTargets?: MergeTarget[];
        // refs
        refs: string;
        // tree
        treeHash?: string;
        blocktree?: string[];
      }

      interface MergeTarget {
        name: string;
        hash: string;
        date: string;
        message: string;
      }
    }

    namespace Branch {
      interface BranchValue {
        // tipo di Branch
        type: "local" | "remote";
        // il nome del branch
        name: string;
        // un flag che indica se il branch è remoto o locale
        isRemote: boolean;
        // l'hash della commit corrente del branch
        commit: Commit.CommitValue;
        // un flag che indica se il branch fa il tracking di un
        // remote branch
        isTrackingRemote?: boolean;
        // l'hash del branch di cui il local branch effettua il tracking
        trackedRemoteBranch?: string;
      }

      interface MergeTarget {
        name: string;
        hash: string;
        date: string;
        message: string;
      }

      interface BranchesRaw {
        [k: string]: string[] | string | Set<string>;
        single: string[];
        roots: Set<string>;
        active: string;
      }
    }

    namespace Git {}

    namespace Log {
      interface CommitFields extends Method.formatArgs {
        hash: string;
        parentHashes: string;
        authorName: string;
        authorEmail: string;
        commitMessage: string;
        creationDate: string;
        lastUpdated: string;
        refs: string;
      }

      interface logExecutor {
        (
          this: LogHandler,
          head_or_hash?: string,
          cwd?: string,
          mergeTargets_or_hasParent?: Commit.MergeTarget[] | boolean
        ):
          | Commit.CommitRaw
          | Commit.CommitValue
          | CommitFields
          | null
          | boolean;
      }

      interface newlog {
        (
          this: LogHandler,
          head_or_hash?: string,
          cwd?: string,
          hasParent?: boolean
        ): CommitFields | null;
      }

      interface newlog {
        (this: LogHandler, head_or_hash?: string): boolean;
      }

      interface newlog {
        (
          this: LogHandler,
          head?: string,
          cwd?: string,
          mergeTargets_or_hasParent?: Commit.MergeTarget[]
        ): Commit.CommitValue;
      }

      interface newlog {
        (
          this: LogHandler,
          head_or_hash?: string,
          cwd?: string,
          mergeTargets_or_hasParent?: Commit.MergeTarget[] | boolean
        ): Commit.CommitRaw;
      }

      type Extends<T, U> = T extends U ? true : false;
      type tested = Extends<logExecutor, newlog>;

      interface log {
        <T extends "getRawCommit">(
          type: T,
          head?: string,
          cwd?: string
        ): Commit.CommitRaw;
      }

      interface log {
        <T extends "getCommit">(
          type: T,
          head: string,
          cwd?: string,
          mergeTargets?: Commit.MergeTarget[]
        ): Commit.CommitValue;
      }

      interface log {
        <T extends "hasParentCommit">(type: T, head?: string): boolean;
      }

      interface log {
        <T extends "getDirectParentOfCommit">(
          type: T,
          hash: string,
          cwd: string | undefined,
          has_parent: boolean
        ): CommitFields | null;
      }
    }

    namespace Tag {
      interface TagValue {
        hash: string;
        name: string;
        commit: string;
      }
    }

    namespace Stash {
      interface StashValue {
        stash_id: string;
        ref: string;
        name: string;
      }
    }

    namespace LocalChanges {
      interface LocalChanges {
        status: "untracked" | "staged";
        filePath: string;
        oldContent: string;
        newContent: string;
      }
    }
  }
}

export interface NewGit {
  lsFiles: NewGit.LsFiles.lsFiles;
  revParse: NewGit.RevParse.revParse;
  log: NewGit.Log.log;
  tag: NewGit.Tag.tag;
  branch: NewGit.Branch.branch;
  add: NewGit.Add.add;
  commit: NewGit.Commit.commit;
  merge: NewGit.Merge.merge;
  checkout: NewGit.Checkout.checkout;
  stash: NewGit.Stash.stash;
  forEachRef: NewGit.forEachRef.forEachRef;
}

const refTypesArray: RefType[] =
  HigherUtilities.JavaScript.ObjectUtils.makeArrayFromEnum(refTypes);

const commandsArray =
  HigherUtilities.JavaScript.ObjectUtils.makeArrayFromEnum(commands);

export const [
  gitstatus,
  gitlsfiles,
  gitrevparse,
  gitlog,
  gittag,
  gitbranch,
  gitadd,
  gitcommit,
  gitmerge,
  gitcheckout,
  gitswitch,
  gitworktree,
  gitstash,
  gitForEachRef,
] = commandsArray.map(c => {
  return `git ${c}`;
});

export abstract class NewGit
  extends Method.Class.Class<keyof typeof classMethods, Methods>
  implements NewGit
{
  constructor() {
    super();
    this.lsFiles = (...args) => {
      const methods = this.methods;
      const method = methods.get(classMethods.lsFiles);
      return method.process(...args);
    };
    this.revParse = (
      ...args: [
        keyof typeof NewGit.RevParse.revParseTypes,
        string | undefined,
        string | undefined
      ]
    ) => {
      const methods = this.methods;
      const method = methods.get(classMethods.revParse);
      return method.process(...args);
    };
    this.log = (...args: [any]) => {
      const methods = this.methods;
      const method = methods.get(classMethods.log);
      return method.process(...args);
    };
    this.tag = (...args: [keyof typeof tagTypes, any]) => {
      const methods = this.methods;
      const method = methods.get(classMethods.tag);
      return method.process(...args);
    };
    this.branch = ((...args: [keyof typeof branchTypes, any]) => {
      const methods = this.methods;
      const method = methods.get(classMethods.branch);
      return method.process(...args);
    }) as NewGit.Branch.branch;
    this.add = (...args) => {
      const methods = this.methods;
      const method = methods.get(classMethods.add);
      return method.process(...args);
    };
    this.commit = (...args) => {
      const methods = this.methods;
      const method = methods.get(classMethods.commit);
      return method.process(...args);
    };
    this.merge = (type: any, tag?: any) => {
      const methods = this.methods;
      const method = methods.get(classMethods.merge);
      return method.process(type, tag);
    };
    this.checkout = (type: any, branch?: any) => {
      const methods = this.methods;
      const method = methods.get(classMethods.checkout);
      return method.process(type, branch);
    };
    this.stash = type => {
      const methods = this.methods;
      const method = methods.get(classMethods.stash);
      return method.process(type);
    };
    this.forEachRef = function (...args) {
      const methods = this.methods;
      const method = methods.get(classMethods.forEachRef);
      return method.process(...args);
    };
  }
  setMethods(): void {
    this.setMethod("lsFiles", new NewGit.LsFiles.LsFiles() as Methods);
    this.setMethod("revParse", new NewGit.RevParse.RevParse() as Methods);
    this.setMethod("log", new NewGit.Log.Log() as Methods);
    this.setMethod("tag", new NewGit.Tag.Tag() as Methods);
    this.setMethod("branch", new NewGit.Branch.Branch() as Methods);
    this.setMethod("add", new NewGit.Add.Add() as Methods);
    this.setMethod("commit", new NewGit.Commit.Commit() as Methods);
    this.setMethod("merge", new NewGit.Merge.Merge() as Methods);
    this.setMethod("checkout", new NewGit.Checkout.Checkout() as Methods);
    this.setMethod("stash", new NewGit.Stash.Stash() as Methods);
    this.setMethod("forEachRef", new NewGit.forEachRef.ForEachRef() as Methods);
  }

  cwd = () => {
    return process.cwd();
  };
  abstract isDirectory(path: string): boolean;
  abstract basename: (path: string, suffix?: string | undefined) => string;
  abstract status(path: undefined, raw: undefined): string[];
  abstract status(path: string, raw: true): string;
  abstract status(path: undefined, raw: true): string;
  abstract status(path?: string, raw?: boolean): string[] | string;
  abstract getUntracked(cwd?: string): string[];
  abstract getBaseDir(): string;
  abstract getCurrentBranch(pointer?: string, cwd?: string): string;
  abstract getHash(branch: string): string;
  abstract getCommit(head: string, cwd?: string): NewGit.Commit.CommitValue;
  abstract hasParentCommit(hash: string): boolean;
  abstract getDirectParentOfCommit(
    h: string,
    cwd: string | undefined,
    has__parent: boolean
  ): NewGit.Log.CommitFields | null;
  abstract getTags(cwd?: string): NewGit.Tag.TagValue[];
  abstract addTag(tag: string, commithash?: string): string;
  abstract deleteTag(tagname: string): string;
  abstract getBranches(filter?: string, ops?: { object?: boolean }): any;
  abstract removeAllBranches(branches: string[], force?: boolean): string[];
  abstract removeBranch(branch: string, force?: boolean): string;
  abstract stageFile(file: string): string;
  abstract commitFile(file: string, message?: string): string[];
  abstract checkoutAndCreate(branch: string): string;
  abstract checkoutADeleteB(A: string, B: string): string;
  abstract makeAllRefs(
    type: string,
    refs: any,
    command?: string,
    output?: string,
    names?:
      | string[]
      | {
          hash: string | string[];
          refs: string[];
        }[],
    v2?: boolean
  ): any;
}

export namespace NewGit {
  export namespace Git {
    export abstract class GitHandler<
      T extends (...args: any[]) => any
    > extends Method.Handler<T> {
      #splitString =
        (sym: string, opt: { filter?: boolean } = { filter: true }) =>
        (e: string) => {
          if (opt.filter) return e.split(sym).filter(Boolean);
          else return e.split(sym);
        };
      splitAtTab = this.#splitString("\t", { filter: false });
      splitAtReturn = this.#splitString("\n");
      format(enum_: Method.formatArgs) {
        const entries = Object.entries(enum_);
        let strings: string[] = [];
        entries.forEach(e => {
          let key = e[0];
          let value = e[1];
          strings.push(`"${key}":"${value}"`);
        });
        strings.join(",");
        return `{${strings}}`;
      }
      throw(error: string | keyof typeof errors) {
        throw new Error(error);
      }
      execSync = execSync;
    }

    export abstract class AbstractGit {
      format(enum_: { [k: string]: string }) {
        const entries = Object.entries(enum_);
        let strings: string[] = [];
        entries.forEach(e => {
          let key = e[0];
          let value = e[1];
          strings.push(`"${key}":"${value}"`);
        });
        strings.join(",");
        return `{${strings}}`;
      }

      cwd = () => {
        return process.cwd();
      };

      abstract refs: Record<RefType, string[] | Stash.StashValue[]>;

      // ////////////////////////////////////// /////////////// fs
      abstract isDirectory(path: string): boolean;
      abstract basename: (path: string, suffix?: string | undefined) => string;

      // ////////////////////////////////////// /////////////// status
      statusNew() {
        gitstatus;
      }
      abstract status(path: undefined, raw: undefined): string[];
      abstract status(path: string, raw: true): string;
      abstract status(path: undefined, raw: true): string;
      abstract status(path?: string, raw?: boolean): string[] | string;

      // ////////////////////////////////////// /////////////// ls-files
      // DONE
      lsFiles = (cwd: string) => {
        const { o, exclude_standard } = gitFlags;
        let command = `${gitlsfiles} ${o} ${exclude_standard}`;
        return execSync(command, {
          withResponse: true,
          trim: true,
          maxBuffer: 10 * 1024 * 1024,
          cwd,
        });
      };
      abstract getUntracked(cwd?: string): string[];

      // ////////////////////////////////////// /////////////// rev-parse
      // DONE
      revParse = (
        type: "baseDir" | "currentBranch" | "getHash",
        pointer_branch?: string,
        cwd?: string
      ) => {
        let options = {
          withResponse: true,
          trim: true,
          maxBuffer: 10 * 1024 * 1024,
          cwd,
        } as const;
        let raw = {
          raw: true,
        } as const;
        const { show_toplevel, abbre_ref } = gitFlags;
        let commands = new Map();
        commands.set("baseDir", `${gitrevparse} ${show_toplevel}`);
        commands.set(
          "currentBranch",
          `${gitrevparse} ${abbre_ref} ${pointer_branch}`
        );
        commands.set("getHash", `git rev-parse ${pointer_branch}`);
        let command = commands.get(type);
        if (!command) throw new Error(errors.noSuchCommand);
        if (type === "getHash") return execSync(command, raw);
        else return execSync(command, options);
      };
      abstract getBaseDir(): string;
      abstract getCurrentBranch(pointer?: string, cwd?: string): string;
      abstract getHash(branch: string): string;

      // ////////////////////////////////////// /////////////// log
      // DONE

      logGetDirectParentOfCommitFieldsOld = [
        GitLogFormat.commitHash, //
        GitLogFormat.committerDate, //
        GitLogFormat.subject, //
        GitLogFormat.refs, //
        GitLogFormat.body,
        GitLogFormat.treeHash,
        GitLogFormat.authorName, //
        GitLogFormat.authorEmail, //
      ];
      logGetDirectParentOfCommitFields = {
        commitHash: GitLogFormat.commitHash, //
        date: GitLogFormat.committerDate, //
        message: GitLogFormat.subject, //
        refs: GitLogFormat.refs, //
        body: GitLogFormat.body,
        treehash: GitLogFormat.treeHash,
        author_name: GitLogFormat.authorName, //
        author_email: GitLogFormat.authorEmail, //
      };
      logGetCommitFields = {
        hash: GitLogFormat.commitHash,
        parentHashes: `[${GitLogFormat.parentHashes}]`,
        authorName: GitLogFormat.authorName,
        authorEmail: GitLogFormat.authorEmail,
        commitMessage: GitLogFormat.subject,
        creationDate: GitLogFormat.committerDateISO,
        lastUpdated: GitLogFormat.authorDateISO,
        refs: GitLogFormat.refsShort,
      };
      logGetCommitSplit = splitters.minorDollar;
      getBranchSplitSym = splitters.verticalBar;
      getBranchCommSplit = splitters.minorDollar;
      logGetRawCommitFields = {
        hash: GitLogFormat.commitHash,
        refs: GitLogFormat.refs,
      };
      #splitString =
        (sym: string, opt: { filter?: boolean } = { filter: true }) =>
        (e: string) => {
          if (opt.filter) return e.split(sym).filter(Boolean);
          else return e.split(sym);
        };
      #splitAtTab = this.#splitString("\t", { filter: false });
      #splitAtReturn = this.#splitString("\n");
      #makeChangeObj =
        (changesObj: {
          [key in `${changesType}`]: string[];
        }) =>
        (c: [string, string]) => {
          let key = c[0] as keyof typeof changesType;
          let value = c[1];
          if (!changesObj[changesType[key]]) changesObj[changesType[key]] = [];
          changesObj[changesType[key]].push(value);
        };
      log(type: "getRawCommit", head?: string, cwd?: string): Commit.CommitRaw;
      log(type: "getCommit", head: string, cwd?: string): Commit.CommitValue;
      log(type: "getDirectParentOfCommit", hash: string, cwd?: string): any;
      log(type: "hasParentCommit", hash?: string): boolean;
      log(
        type: keyof typeof logTypes,
        head_or_hash?: string,
        cwd: string = this.cwd()
      ) {
        const { format, name_status, decorate } = gitFlags;
        let logtype = logTypes[type];
        let commands = new Map();
        /// commands
        commands.set(
          logTypes.hasParentCommit,
          head_or_hash
            ? `${gitlog} --pretty=${GitLogFormat.parentHashes} ${head_or_hash}`
            : `${gitlog} --pretty=${GitLogFormat.parentHashes}`
        );
        commands.set(
          logTypes.getDirectParentOfCommit,
          `${gitlog} ${gitFlags.pretty}format:'${this.format(
            this.logGetDirectParentOfCommitFields
          )}' ${head_or_hash}^`
        );
        commands.set(
          logTypes.getCommit,
          `${gitlog} ${name_status} ${decorate}full ${format}'${
            this.logGetCommitSplit
          }${this.format(this.logGetCommitFields)}' ${head_or_hash}`
        );
        commands.set(
          logTypes.getRawCommit,
          `${gitlog} ${gitFlags.all} ${gitFlags.pretty}format:'${this.format(
            this.logGetRawCommitFields
          )}'`
        );
        let command = commands.get(logtype);
        let opt2 = { raw: true } as const;
        let response;
        if (head_or_hash === undefined) {
          if (type === "getRawCommit") {
            response = execSync(command, {
              raw: true,
              git: true,
              cwd,
            });
            return response;
          } else {
            response = execSync(command, opt2);
            if (response === `\n`) return false;
            else return true;
          }
        } else {
          if (type === "getDirectParentOfCommit") {
            if (!this.hasParentCommit(head_or_hash)) return null;
            return (response = execSync(command, {
              raw: true,
              cwd,
              git: true,
            }));
          } else if (type === "hasParentCommit") {
            response = execSync(command, opt2);
            if (response === `\n`) return false;
            else return true;
          } else if (type === "getCommit") {
            let children = this.branch("mergeTargets", head_or_hash);
            response = execSync(command, { raw: true, cwd });
            response = response.split(this.logGetCommitSplit);
            response = response.filter(Boolean);
            response = response.map(this.#splitAtReturn);
            response = response.map(e => {
              let [data, ...changes]: (Commit.CommitValue | string | any)[] = e;
              changes = changes.map(this.#splitAtTab);
              let changesObj: {
                [key in `${changesType}`]: string[];
              } = {
                modified: [],
                added: [],
                deleted: [],
              };
              changes.forEach(this.#makeChangeObj(changesObj));
              data = JSON.parse(data);
              let parenthashes = data.parentHashes;
              let length = parenthashes.length;
              parenthashes = parenthashes.slice(1, length - 1);
              parenthashes = parenthashes.split(" ");
              data.parentHashes = parenthashes;
              (data as Commit.CommitValue).commitCount = parenthashes.length;
              (data as Commit.CommitValue).filesChanged =
                changesObj.modified.length;
              (data as Commit.CommitValue).insertions = changesObj.added.length;
              (data as Commit.CommitValue).deletions =
                changesObj.deleted.length;
              (data as Commit.CommitValue).changes = changesObj;
              // get children datas
              if (children.length > 0) {
                (data as Commit.CommitValue).isMerged = true;
                (data as Commit.CommitValue).mergeTargets = children;
              } else {
                (data as Commit.CommitValue).isMerged = false;
              }
              return data;
            });
            return response[0];
          }
        }
      }

      abstract getCommit(head: string, cwd?: string): Commit.CommitValue;
      abstract hasParentCommit(hash: string): boolean;
      abstract getDirectParentOfCommit(
        h: string,
        cwd?: string
      ): Commit.CommitValue | null;

      // ////////////////////////////////////// /////////////// tag
      // DONE

      SPLIT_SYM = splitters.comma;
      tagFieldsOld = [
        commitObjectFields.refnameShort,
        commitObjectFields.objectname,
        commitObjectFields.object,
      ];
      tagFields = {
        name: commitObjectFields.refnameShort,
        hash: commitObjectFields.objectname,
        commit: commitObjectFields.object,
      };

      tag(type: "addTag", tag: string, commitHash?: string): string;
      tag(type: "deleteTag", tag: string): string;
      tag(type: "getTags", cwd?: string): Tag.TagValue[];
      tag(
        type: keyof typeof tagTypes,
        arg2 = this.cwd(),
        commitHash?: string
      ): Tag.TagValue[] | string {
        let commands = new Map();
        commands.set(
          tagTypes.getTags,
          `${gittag} ${gitFlags.format}'${this.format(this.tagFields)}'`
        );
        commands.set(
          tagTypes.addTag,
          commitHash ? `${gittag} ${arg2} ${commitHash}` : `${gittag} ${arg2}`
        );
        commands.set(tagTypes.deleteTag, `${gittag} -d ${arg2}`);
        let command = commands.get(tagTypes[type]);
        if (type === "getTags") {
          return execSync(command, {
            raw: true,
            cwd: arg2,
            git: true,
          }) as unknown as Tag.TagValue[];
        } else if (type === "addTag") {
          return execSync(command, { raw: true });
        } else if (type === "deleteTag") {
          return execSync(command, { raw: true });
        } else return "";
      }
      abstract getTags(cwd?: string): Tag.TagValue[];
      abstract addTag(tag: string, commithash?: string): string;
      abstract deleteTag(tagname: string): string;

      // ////////////////////////////////////// /////////////// branch
      // DONE

      branchMergetargetsSplit = splitters.minorDollar;
      branchMergeTargetsFields = {
        name: commitObjectFields.refname,
        hash: commitObjectFields.objectname,
        date: commitObjectFields.committerDateUnix,
        message: commitObjectFields.subject,
      };
      branchGetBranchSplit = splitters.return;
      branchGetBranchFields = {
        name: commitObjectFields.refname,
        trackedRemoteBranch: commitObjectFields.upstream,
      };
      branch(type: "removeBranch", branch: string): string;
      branch(
        type: "removeBranch",
        ops: { branch: string; force: true }
      ): string;
      branch(type: "getBranches", ops: { object: true }): Branch.BranchesRaw;
      branch(type: "getBranches"): string[];
      branch(type: "getBranch", head: string): Branch.BranchValue;
      branch(type: "mergeTargets", head: string): Commit.MergeTarget[];
      branch(
        type: keyof typeof branchTypes,
        arg2?:
          | string
          | {
              object?: boolean;
              branch?: string;
              force?: boolean;
            }
      ):
        | Commit.MergeTarget[]
        | Branch.BranchValue
        | string
        | string[]
        | string[][]
        | Branch.BranchesRaw {
        const { contains, format } = gitFlags;
        let branchtype = branchTypes[type];
        let commands = new Map();
        commands.set(
          branchTypes.mergeTargets,
          `${gitbranch}  ${contains} ${arg2} -a -vv ${format}'${
            this.branchMergetargetsSplit
          }${this.format(this.branchMergeTargetsFields)}'`
        );
        commands.set(
          branchTypes.getBranch,
          `${gitbranch} ${contains} ${arg2} -a -vv ${format}'${this.format(
            this.branchGetBranchFields
          )}'`
        );
        commands.set(branchTypes.getBranches, `${gitbranch}`);
        commands.set(
          branchTypes.removeBranch,
          `${gitbranch} ${
            typeof arg2 === "string"
              ? `-d ${arg2}`
              : typeof arg2 === "object"
              ? arg2.branch
                ? `-D ${arg2.branch}`
                : ""
              : typeof arg2 === "undefined"
              ? `-D default/new/branch`
              : this.#throw(errors.typeOfArg2)
          }`
        );
        const command = commands.get(branchtype);
        let result: Branch.BranchValue | Commit.MergeTarget[] = [];
        if (type === branchTypes.mergeTargets) {
          if (!arg2) this.#throw(errors.needHead);
          if (typeof arg2 !== "string") this.#throw(errors.wrongType);
          return this.mergeTargetsStrgy(result, command, arg2 as string);
        } else if (type === branchTypes.getBranch) {
          if (!arg2) this.#throw(errors.needHead);
          if (typeof arg2 !== "string") this.#throw(errors.wrongType);
          return this.getBranchStrategy(arg2 as string, result, command);
        } else if (type === branchTypes.getBranches) {
          let response: string | string[] | string[][] | Branch.BranchesRaw =
            [];
          response = this.getBranchesStrategy(command);
          if (arg2) {
            if (typeof arg2 === "string") throw new Error(errors.wrongType);
            if (!arg2.object) throw new Error(errors.objectSetTrue);
            response = this.getBranchesStrategy(
              command,
              arg2 as { object: true }
            );
          }
          return response;
        } else if (type === branchTypes.removeBranch) {
          if (typeof arg2 === "string") {
            return execSync(command, { raw: true });
          }
        }
        return result;
      }
      #throw(error: string | keyof typeof errors) {
        throw new Error(error);
      }

      private mergeTargetsStrgy(
        result: Branch.BranchValue | Commit.MergeTarget[],
        command: any,
        head: string
      ) {
        result = execSync(command, { raw: true })
          .split(this.branchMergetargetsSplit)
          .filter(Boolean)
          .map(JSON.parse as (e: string) => Commit.MergeTarget)
          .filter(e => (e.name === head ? false : true));
        return result;
      }

      #makeBranch(
        isRemote: boolean
      ): (
        value: Branch.BranchValue,
        index: number,
        array: Branch.BranchValue[]
      ) => Partial<Branch.BranchValue> {
        return r => {
          let condition = r.trackedRemoteBranch === "";
          if (condition)
            return {
              name: r.name,
              isRemote,
              type: isRemote ? "remote" : "local",
            };
          else {
            r.isTrackingRemote = true;
            r.isRemote = isRemote;
            r.type = isRemote ? "remote" : "local";
            return r;
          }
        };
      }

      private getBranchStrategy(
        head: string,
        result:
          | Commit.MergeTarget[]
          | Branch.BranchValue
          | Branch.BranchValue[],
        command: any
      ): Branch.BranchValue {
        {
          if (!head.includes("refs/"))
            throw new Error(errors.headMustStartRefs);
          let isRemote = head.includes("refs/remotes/");
          result = execSync(command, { raw: true })
            .split(this.branchGetBranchSplit)
            .filter(Boolean)
            .map(JSON.parse as (e: string) => Branch.BranchValue)
            .filter(r => (r.name === head ? true : false))
            .map(this.#makeBranch(isRemote)) as Branch.BranchValue[];
          if (!result[0]) throw new Error(errors.noBranch);
          result = result[0];
          let commit = this.log("getCommit", result.name);
          result.commit = commit;
        }
        return result;
      }

      private getBranchesStrategy(command: string): string[];
      private getBranchesStrategy(
        command: string,
        ops: { object: true }
      ): Branch.BranchesRaw;
      private getBranchesStrategy(
        command: string,
        ops?: { object: boolean }
      ): string[] | Branch.BranchesRaw {
        let result: string | string[] | string[][] | Branch.BranchesRaw = [];
        if (ops) {
          let object: Branch.BranchesRaw = {
            single: [],
            active: "",
            roots: new Set(),
          };
          execSync(command, { filter: true }).forEach(e => {
            let split = e.split(splitters.space);
            let condition = split.length === 3;
            let path: string = "";
            if (condition) {
              path = split[2]!;
            } else {
              path = split[1]!;
              object.active = path;
            }
            let levels = path.split(splitters.slash);
            condition = levels.length === 1;
            if (condition) {
              object.single.push(levels[0]!);
            } else {
              let root = levels[0];
              object.roots.add(root!);
              if (!root) throw new Error(errors.noRoot);
              if (!object[root]) object[root] = [];
              (object[root] as string[]).push(path);
            }
            return object;
          });
          result = object;
        } else {
          result = execSync(command, {
            trim: true,
            withResponse: true,
          });
        }
        return result;
      }

      abstract getBranches(filter?: string, ops?: { object?: boolean }): any;
      abstract removeAllBranches(branches: string[], force?: boolean): string[];
      abstract removeBranch(branch: string, force?: boolean): string;

      // ////////////////////////////////////// /////////////// add
      add(type: "stageFile", file: string): string;
      add(type: keyof typeof addTypes, file: string): string {
        let commands = new Map();
        commands.set(addTypes.stageFile, `${gitadd} ${file}`);
        let commandtype = addTypes[type];
        let command = commands.get(commandtype);
        return execSync(command, { raw: true });
      }
      abstract stageFile(file: string): string;

      // ////////////////////////////////////// /////////////// commit
      commit(
        type: keyof typeof commitTypes,
        file: string,
        message: string = "default message"
      ): string[] {
        let commands = new Map();
        commands.set(
          commitTypes.commitFile,
          `${gitcommit} ${file} -m ${message}`
        );
        let commandtype = commitTypes[type];
        let command = commands.get(commandtype);
        return execSync(command, { raw: true }).split(splitters.return);
      }
      abstract commitFile(file: string, message?: string): string[];

      // ////////////////////////////////////// /////////////// merge
      merge(tagname: string): this;
      merge(type: "merge", tag?: string): this;
      merge(type: keyof typeof mergeTypes | string, tag?: string): this {
        let commands = new Map();
        commands.set(
          mergeTypes.merge,
          `${gitmerge} ${tag ? tag : type} --no-ff`
        );
        let commandtype = mergeTypes[type as keyof typeof mergeTypes];
        let command = commands.get(commandtype);
        if (!command) {
          command = commands.get(mergeTypes.merge);
          execSync(command, { raw: true });
        } else {
          if (!tag) throw new Error(errors.nameForTag);
        }
        execSync(command, { raw: true });
        return this;
      }

      // ////////////////////////////////////// /////////////// worktree
      worktree() {
        gitworktree;
      }

      // ////////////////////////////////////// /////////////// switch
      switch() {
        gitswitch;
      }

      // ////////////////////////////////////// /////////////// checkout
      checkout(type: string): string;
      checkout(type: "checkoutAndCreate", branch: string): string;
      checkout(type: "checkoutBranch", branch: string): string;
      checkout(type: keyof typeof checkoutTypes, branch: string): string;
      checkout(
        type: keyof typeof checkoutTypes | string,
        branch?: string
      ): string {
        let commands = new Map();
        // se l'argomento branch non è presente significa che
        // il valore del branch è passato come primo
        // argomento. Questo significa inoltre che il valore
        // restituito da get() del Map restituirà undefined.
        let actualbranch = branch ? branch : type;
        commands.set(
          checkoutTypes.checkoutBranch,
          `${gitcheckout} ${actualbranch}`
        );
        commands.set(
          checkoutTypes.checkoutAndCreate,
          `${gitcheckout} -b ${branch}`
        );
        let commandtype = checkoutTypes[type as keyof typeof checkoutTypes];
        let command = commands.get(commandtype);
        if (!branch) {
          command = commands.get(checkoutTypes.checkoutBranch);
          if ((type as keyof typeof checkoutTypes) === "checkoutAndCreate") {
            throw new Error(errors.nameForBranch);
          }
        }
        let response = execSync(command, { raw: true });
        return response;
      }
      abstract checkoutAndCreate(branch: string): string;
      abstract checkoutADeleteB(A: string, B: string): string;

      // ////////////////////////////////////// /////////////// stash
      stashMakeStashRawFields = {
        reflog: GitLogFormat.reflogShort,
        subject: GitLogFormat.reflogSubject,
      };
      stash(type: keyof typeof stashTypes): {
        reflog: string;
        subject: string;
      };
      stash(type: keyof typeof stashTypes) {
        enum stashCommands {
          list = "list",
        }
        let commands = new Map();
        commands.set(
          stashTypes.makeStashRaw,
          `${gitstash} ${stashCommands.list} ${gitFlags.format}'${this.format(
            this.stashMakeStashRawFields
          )}'`
        );
        let stashtype = stashTypes[type];
        let command = commands.get(stashtype);
        let result:
          | {
              reflog: string;
              subject: string;
            }
          | string = "";
        if (type === "makeStashRaw") {
          result = execSync(command, {
            raw: true,
            cwd: this.cwd(),
            git: true,
          }) as unknown as { reflog: string; subject: string };
        }
        return result;
      }

      // ////////////////////////////////////// /////////////// for-each-ref
      forEachRef(
        type: keyof typeof forEachRefTypes,
        reftype: string,
        cwd?: string
      ): string[];
      forEachRef(
        type: keyof typeof forEachRefTypes,
        reftype: string,
        cwd = this.cwd()
      ): string[] | undefined {
        let commands = new Map();
        commands.set(
          forEachRefTypes.makeAllRefs,
          `${gitForEachRef} ${gitFlags.format}'${commitObjectFields.refname}' refs/${reftype}/`
        );
        const command = commands.get(forEachRefTypes[type]);
        if (type === "makeAllRefs") {
          return execSync(command, {
            raw: true,
            cwd,
          })
            .split(splitters.return)
            .filter(Boolean);
        }
      }
      abstract makeAllRefs(
        type: string,
        refs: any,
        command?: string,
        output?: string,
        names?:
          | string[]
          | {
              hash: string | string[];
              refs: string[];
            }[],
        v2?: boolean
      ): any;
    }
  }

  export namespace Add {
    class AddExecutor extends Method.Executor<addExecutor> {
      execute: addExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    const stageFile: addExecutor = function (file) {
      const command = `${this.gitadd} ${file}`;
      return this.execSync(command, { raw: true });
    };

    export class AddHandler extends NewGit.Git.GitHandler<addExecutor> {
      gitadd = gitadd;
    }

    export class Add extends Method.Method<typeof addTypes, addExecutor> {
      constructor() {
        super(addTypes, AddExecutor, AddHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const sfType = this.types.stageFile;
        const sfHandler = new Handler(stageFile);
        const sfExe = new Executor(sfHandler);
        this.setCommand(sfType, sfExe);
      }
    }
  }

  export namespace Log {
    enum logTypes {
      getCommit = "getCommit",
      hasParentCommit = "hasParentCommit",
      getDirectParentOfCommit = "getDirectParentOfCommit",
      getRawCommit = "getRawCommit",
    }

    class LogExecutor extends Method.Executor<logExecutor> {
      execute: logExecutor = (head_hash, cwd, merge) => {
        return this.handler.handle(head_hash, cwd, merge);
      };
    }

    export class LogHandler extends NewGit.Git.GitHandler<logExecutor> {
      gitlog = gitlog;
      logGetCommitSplit = splitters.minorDollar;

      logGetCommitFields: CommitFields = {
        hash: GitLogFormat.commitHash,
        parentHashes: `[${GitLogFormat.parentHashes}]`,
        authorName: GitLogFormat.authorName,
        authorEmail: GitLogFormat.authorEmail,
        commitMessage: GitLogFormat.subject,
        creationDate: GitLogFormat.committerDateISO,
        lastUpdated: GitLogFormat.authorDateISO,
        refs: GitLogFormat.refsShort,
      };

      logGetRawCommitFields = {
        hash: GitLogFormat.commitHash,
        refs: GitLogFormat.refs,
      };

      logGetDirectParentOfCommitFields = {
        commitHash: GitLogFormat.commitHash, //
        date: GitLogFormat.committerDate, //
        message: GitLogFormat.subject, //
        refs: GitLogFormat.refs, //
        body: GitLogFormat.body,
        treehash: GitLogFormat.treeHash,
        author_name: GitLogFormat.authorName, //
        author_email: GitLogFormat.authorEmail, //
      };
    }

    export const getCommit: logExecutor = function (
      head_or_hash,
      cwd,
      mergeTargets
    ) {
      const { format, name_status, decorate } = gitFlags;
      let command = `${this.gitlog} ${name_status} ${decorate}full ${format}'${
        this.logGetCommitSplit
      }${this.format(this.logGetCommitFields)}' ${head_or_hash}`;
      let response;
      let children = mergeTargets as Commit.MergeTarget[];
      response = this.execSync(command, { raw: true, cwd });
      response = response.split(this.logGetCommitSplit);
      response = response.filter(Boolean);
      response = response.map(this.splitAtReturn);
      response = response.map(e => {
        let [data, ...changes]: (Commit.CommitValue | string | any)[] = e;
        changes = changes.map(this.splitAtTab);
        let changesObj: {
          [key in `${changesType}`]: string[];
        } = {
          modified: [],
          added: [],
          deleted: [],
        };
        data = JSON.parse(data);
        let parenthashes = data.parentHashes;
        let length = parenthashes.length;
        parenthashes = parenthashes.slice(1, length - 1);
        parenthashes = parenthashes.split(" ");
        data.parentHashes = parenthashes;
        (data as Commit.CommitValue).commitCount = parenthashes.length;
        (data as Commit.CommitValue).filesChanged = changesObj.modified.length;
        (data as Commit.CommitValue).insertions = changesObj.added.length;
        (data as Commit.CommitValue).deletions = changesObj.deleted.length;
        if (children.length > 0) {
          (data as Commit.CommitValue).isMerged = true;
          (data as Commit.CommitValue).mergeTargets = children;
        } else {
          (data as Commit.CommitValue).isMerged = false;
        }
        return data;
      });
      return response[0] as Commit.CommitValue;
    };

    export const getDirectParentOfCommit: logExecutor = function (
      head_or_hash,
      cwd,
      hasParent
    ) {
      const command = `${this.gitlog} ${gitFlags.pretty}format:'${this.format(
        this.logGetDirectParentOfCommitFields
      )}' ${head_or_hash}^`;
      if (!hasParent) return null;
      return this.execSync<CommitFields>(command, {
        raw: true,
        cwd,
        git: true,
      });
    };

    export const getRawCommit: logExecutor = function (_, cwd) {
      const command: string = `${this.gitlog} ${gitFlags.all} ${
        gitFlags.pretty
      }format:'${this.format(this.logGetRawCommitFields)}'`;

      return this.execSync(command, {
        raw: true,
        git: true,
        cwd,
      });
    };

    export let hasParentCommit: logExecutor = function (head_or_hash) {
      const command = head_or_hash
        ? `${this.gitlog} --pretty=${GitLogFormat.parentHashes} ${head_or_hash}`
        : `${this.gitlog} --pretty=${GitLogFormat.parentHashes}`;

      let response = this.execSync(command, { raw: true });
      if (response === `\n`) return false;
      else return true;
    };

    export class Log extends Method.Method<typeof logTypes, logExecutor> {
      constructor() {
        super(logTypes, LogExecutor, LogHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const gcType = this.types.getCommit;
        const gchandler = new Handler(getCommit);
        const gcExe = new Executor(gchandler);
        this.setCommand(gcType, gcExe);
        const hpcType = this.types.hasParentCommit;
        const hpcHandler = new Handler(hasParentCommit);
        const hpcExe = new Executor(hpcHandler);
        this.setCommand(hpcType, hpcExe);
        const grcType = this.types.getRawCommit;
        const grcHandler = new Handler(getRawCommit);
        const grcExe = new Executor(grcHandler);
        this.setCommand(grcType, grcExe);
        const gdpcType = this.types.getDirectParentOfCommit;
        const gdpcHandler = new Handler(getDirectParentOfCommit);
        const gdpcExe = new Executor(gdpcHandler);
        this.setCommand(gdpcType, gdpcExe);
      }
    }
  }

  export namespace Branch {
    export enum branchTypes {
      mergeTargets = "mergeTargets",
      getBranch = "getBranch",
      getBranches = "getBranches",
      removeBranch = "removeBranch",
    }

    export interface branch {
      (type: "removeBranch", branch: string): string;
      (type: "mergeTargets", head: string): MergeTarget[];
      (type: "removeBranch", ops: { branch: string; force: true }): string;
      (type: "getBranches", ops: { object: true }): BranchesRaw;
      (type: "getBranches"): string[];
      (
        type: "getBranch",
        head: string,
        commit: Commit.CommitValue
      ): BranchValue;
      (type: "mergeTargets", head: string): MergeTarget[];
      (
        type: keyof typeof branchTypes,
        arg2?:
          | string
          | {
              object?: boolean;
              branch?: string;
              force?: boolean;
            },
        commit?: Commit.CommitValue
      ):
        | MergeTarget[]
        | BranchValue
        | string
        | string[]
        | string[][]
        | BranchesRaw;
    }

    export interface branchExecutor {
      (
        this: BranchHandler,
        arg:
          | string
          | {
              object?: boolean;
              branch?: string;
              force?: boolean;
            },
        commit?: Commit.CommitValue
      ):
        | MergeTarget[]
        | BranchValue
        | string
        | string[]
        | string[][]
        | BranchesRaw;
    }

    class BranchExecutor extends Method.Executor<branchExecutor> {
      execute: branchExecutor = (arg, commit) => {
        return this.handler.handle(arg, commit);
      };
    }

    class BranchHandler extends NewGit.Git.GitHandler<branchExecutor> {
      gitbranch = gitbranch;
      makeBranch(
        isRemote: boolean
      ): (
        value: BranchValue,
        index: number,
        array: BranchValue[]
      ) => Partial<BranchValue> {
        return r => {
          let condition = r.trackedRemoteBranch === "";
          if (condition)
            return {
              name: r.name,
              isRemote,
              type: isRemote ? "remote" : "local",
            };
          else {
            r.isTrackingRemote = true;
            r.isRemote = isRemote;
            r.type = isRemote ? "remote" : "local";
            return r;
          }
        };
      }
      branchMergetargetsSplit = splitters.minorDollar;
      branchMergeTargetsFields = {
        name: commitObjectFields.refname,
        hash: commitObjectFields.objectname,
        date: commitObjectFields.committerDateUnix,
        message: commitObjectFields.subject,
      };
      branchGetBranchSplit = splitters.return;
      branchGetBranchFields = {
        name: commitObjectFields.refname,
        trackedRemoteBranch: commitObjectFields.upstream,
      };
    }

    export const getBranch: branchExecutor = function (head, commit) {
      if (typeof head !== "string") throw new Error(errors.wrongType);
      if (!head.includes("refs/")) throw new Error(errors.headMustStartRefs);
      const { format, contains } = gitFlags;
      const command = `${
        this.gitbranch
      } ${contains} ${head} -a -vv ${format}'${this.format(
        this.branchGetBranchFields
      )}'`;
      let isRemote = head.includes("refs/remotes/");
      type Result = BranchValue | BranchValue[];
      let result: Result = this.execSync(command, {
        raw: true,
      })
        .split(this.branchGetBranchSplit)
        .filter(Boolean)
        .map(JSON.parse as (e: string) => BranchValue)
        .filter(r => (r.name === head ? true : false))
        .map(this.makeBranch(isRemote)) as BranchValue[];
      if (!result[0]) throw new Error(errors.noBranch);
      result = result[0];
      result.commit = commit!;
      return result;
    };

    export const mergeTargets: branchExecutor = function (head): MergeTarget[] {
      if (!head) this.throw(errors.needHead);
      if (typeof head !== "string") this.throw(errors.wrongType);
      const { format, contains } = gitFlags;
      const command = `${
        this.gitbranch
      }  ${contains} ${head} -a -vv ${format}'${
        this.branchMergetargetsSplit
      }${this.format(this.branchMergeTargetsFields)}'`;
      return this.execSync(command, { raw: true })
        .split(this.branchMergetargetsSplit)
        .filter(Boolean)
        .map(JSON.parse as (e: string) => MergeTarget)
        .filter(e => (e.name === head ? false : true));
    };

    export const getBranches: branchExecutor = function (
      ops
    ): string[] | BranchesRaw {
      if (typeof ops === "string") throw new Error(errors.wrongType);
      const command = `${this.gitbranch}`;
      let response: string | string[] | string[][] | BranchesRaw = [];

      if (ops) {
        let object: BranchesRaw = {
          single: [],
          active: "",
          roots: new Set(),
        };
        this.execSync(command, { filter: true }).forEach(e => {
          let split = e.split(splitters.space);
          let condition = split.length === 3;
          let path: string = "";
          if (condition) {
            path = split[2]!;
          } else {
            path = split[1]!;
            object.active = path;
          }
          let levels = path.split(splitters.slash);
          condition = levels.length === 1;
          if (condition) {
            object.single.push(levels[0]!);
          } else {
            let root = levels[0];
            object.roots.add(root!);
            if (!root) throw new Error(errors.noRoot);
            if (!object[root]) object[root] = [];
            (object[root] as string[]).push(path);
          }
          return object;
        });
        response = object;
      } else {
        response = this.execSync(command, {
          trim: true,
          withResponse: true,
        });
      }
      return response;
    };

    export const removeBranch: branchExecutor = function (arg2) {
      let result: BranchValue | MergeTarget[] = [];
      const command = `${this.gitbranch} ${
        typeof arg2 === "string"
          ? `-d ${arg2}`
          : typeof arg2 === "object"
          ? arg2.branch
            ? `-D ${arg2.branch}`
            : ""
          : typeof arg2 === "undefined"
          ? `-D default/new/branch`
          : this.throw(errors.typeOfArg2)
      }`;
      if (typeof arg2 === "string") {
        return this.execSync(command, { raw: true });
      }
      return result;
    };

    export class Branch extends Method.Method<
      typeof branchTypes,
      branchExecutor
    > {
      constructor() {
        super(branchTypes, BranchExecutor, BranchHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const mtType = this.types.mergeTargets;
        const mtHandler = new Handler(mergeTargets);
        const mtExe = new Executor(mtHandler);
        this.setCommand(mtType, mtExe);
        const gbType = this.types.getBranch;
        const gbHandler = new Handler(getBranch);
        const gbExe = new Executor(gbHandler);
        this.setCommand(gbType, gbExe);
        const gbsType = this.types.getBranches;
        const gbsHandler = new Handler(getBranches);
        const gbsExe = new Executor(gbsHandler);
        this.setCommand(gbsType, gbsExe);
        const rmbType = this.types.removeBranch;
        const rmbHandler = new Handler(removeBranch);
        const rmbExe = new Executor(rmbHandler);
        this.setCommand(rmbType, rmbExe);
      }
    }
  }

  export namespace LsFiles {
    enum lsFilesTypes {
      getUntracked = "getUntracked",
    }

    export interface lsFiles {
      (type: keyof typeof lsFilesTypes, cwd: string): string[];
    }

    export interface lsFilesExecutor {
      (this: LsFilesHandler, cwd: string): string[];
    }

    class LsFilesExecutor extends Method.Executor<lsFilesExecutor> {
      execute: lsFilesExecutor = cwd => {
        return this.handler.handle(cwd);
      };
    }

    export class LsFilesHandler extends NewGit.Git.GitHandler<lsFilesExecutor> {
      static createLsFileExecutor(executor: lsFilesExecutor) {
        return executor;
      }
      gitlsfiles = gitlsfiles;
    }

    export const getUntracked: lsFilesExecutor = function (cwd) {
      const { o, exclude_standard } = gitFlags;
      let command = `${this.gitlsfiles} ${o} ${exclude_standard}`;
      return this.execSync(command, {
        withResponse: true,
        trim: true,
        maxBuffer: 10 * 1024 * 1024,
        cwd,
      });
    };

    export class LsFiles extends Method.Method<
      typeof lsFilesTypes,
      lsFilesExecutor
    > {
      constructor() {
        super(lsFilesTypes, LsFilesExecutor, LsFilesHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const guType = this.types.getUntracked;
        const guHandler = new Handler(getUntracked);
        const guExe = new Executor(guHandler);
        this.setCommand(guType, guExe);
      }
    }
  }

  export namespace RevParse {
    export enum revParseTypes {
      baseDir = "baseDir",
      currentBranch = "currentBranch",
      getHash = "getHash",
    }

    export interface revParse {
      (type: "baseDir", pointer_branch?: string, cwd?: string): string[];
      (type: "currentBranch", pointer_branch?: string, cwd?: string): string[];
      (type: "getHash", pointer_branch?: string, cwd?: string): string;
      (
        type: keyof typeof revParseTypes,
        pointer_branch?: string,
        cwd?: string
      ): string | string[];
    }

    export interface revParseExecutor {
      (this: RevParseHandler, pointer_branch?: string, cwd?: string):
        | string
        | string[];
    }

    class RevParseExecutor extends Method.Executor<revParseExecutor> {
      execute: revParseExecutor = (pointer_branch, cwd) => {
        return this.handler.handle(pointer_branch, cwd);
      };
    }

    export class RevParseHandler extends NewGit.Git
      .GitHandler<revParseExecutor> {
      gitrevparse = gitrevparse;
      options = (cwd: string) =>
        ({
          withResponse: true,
          trim: true,
          maxBuffer: 10 * 1024 * 1024,
          cwd,
        } as const);
    }

    export const baseDir: revParseExecutor = function (_, cwd): string[] {
      let options = {
        withResponse: true,
        trim: true,
        maxBuffer: 10 * 1024 * 1024,
        cwd,
      } as const;
      const { show_toplevel } = gitFlags;
      const command = `${this.gitrevparse} ${show_toplevel}`;
      return this.execSync(command, options);
    };

    export const currentBranch: revParseExecutor = function (
      pointer_branch,
      cwd
    ): string[] {
      const { abbre_ref } = gitFlags;
      const command = `${this.gitrevparse} ${abbre_ref} ${pointer_branch}`;
      return this.execSync(command, this.options(cwd!));
    };

    export const getHash: revParseExecutor = function (pointer_branch): string {
      let raw = {
        raw: true,
      } as const;
      const command = `${this.gitrevparse} ${pointer_branch}`;
      return this.execSync(command, raw);
    };

    export class RevParse extends Method.Method<
      typeof revParseTypes,
      revParseExecutor
    > {
      constructor() {
        super(revParseTypes, RevParseExecutor, RevParseHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const bdType = this.types.baseDir;
        const bdHandler = new Handler(baseDir);
        const bdExe = new Executor(bdHandler);
        this.setCommand(bdType, bdExe);
        const cbType = this.types.currentBranch;
        const cbHandler = new Handler(currentBranch);
        const cbExe = new Executor(cbHandler);
        this.setCommand(cbType, cbExe);
        const ghType = this.types.getHash;
        const ghHandler = new Handler(getHash);
        const ghExe = new Executor(ghHandler);
        this.setCommand(ghType, ghExe);
      }
    }
  }

  export namespace Tag {
    enum tagTypes {
      getTags = "getTags",
      addTag = "addTag",
      deleteTag = "deleteTag",
    }

    export interface tag {
      (type: "addTag", tag: string, commitHash?: string): string;
      (type: "deleteTag", tag: string): string;
      (type: "getTags", cwd?: string): TagValue[];
      (type: keyof typeof tagTypes, arg2: string, commitHash?: string):
        | TagValue[]
        | string;
    }

    export interface tagExecutor {
      (this: TagHandler, arg2: string, commitHash?: string):
        | TagValue[]
        | string;
    }

    class TagExecutor extends Method.Executor<tagExecutor> {
      execute: tagExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class TagHandler extends NewGit.Git.GitHandler<tagExecutor> {
      gittag = gittag;
      tagFields = {
        name: commitObjectFields.refnameShort,
        hash: commitObjectFields.objectname,
        commit: commitObjectFields.object,
      };
    }

    export const addTag: tagExecutor = function (arg2, commitHash) {
      const command = commitHash
        ? `${this.gittag} ${arg2} ${commitHash}`
        : `${this.gittag} ${arg2}`;
      return this.execSync(command, { raw: true });
    };

    export const deleteTag: tagExecutor = function (arg2) {
      const command = `${this.gittag} -d ${arg2}`;
      return this.execSync(command, { raw: true });
    };

    export const getTags: tagExecutor = function (arg2) {
      const command = `${this.gittag} ${gitFlags.format}'${this.format(
        this.tagFields
      )}'`;
      return this.execSync(command, {
        raw: true,
        cwd: arg2,
        git: true,
      }) as unknown as TagValue[];
    };

    export class Tag extends Method.Method<typeof tagTypes, tagExecutor> {
      constructor() {
        super(tagTypes, TagExecutor, TagHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const atType = this.types.addTag;
        const atHandler = new Handler(addTag);
        const atExe = new Executor(atHandler);
        this.setCommand(atType, atExe);
        const dtType = this.types.deleteTag;
        const dtHandler = new Handler(deleteTag);
        const dtExe = new Executor(dtHandler);
        this.setCommand(dtType, dtExe);
        const gtType = this.types.getTags;
        const gtHandler = new Handler(getTags);
        const gtExe = new Executor(gtHandler);
        this.setCommand(gtType, gtExe);
      }
    }
  }

  export namespace Commit {
    enum commitTypes {
      commitFile = "commitFile",
    }

    export interface commit {
      (
        type: keyof typeof commitTypes,
        file: string,
        message?: string
      ): string[];
    }

    export interface commitExecutor {
      (this: CommitHandler, file: string, message: string): string[];
    }

    class CommitExecutor extends Method.Executor<commitExecutor> {
      execute: commitExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class CommitHandler extends NewGit.Git.GitHandler<commitExecutor> {
      gitcommit = gitcommit;
    }

    export const commitFile: commitExecutor = function (
      file,
      message = "default message"
    ) {
      const command = `${this.gitcommit} ${file} -m ${message}`;
      return this.execSync(command, { raw: true }).split(splitters.return);
    };

    export class Commit extends Method.Method<
      typeof commitTypes,
      commitExecutor
    > {
      constructor() {
        super(commitTypes, CommitExecutor, CommitHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const cfType = this.types.commitFile;
        const cfHandler = new Handler(commitFile);
        const cfExe = new Executor(cfHandler);
        this.setCommand(cfType, cfExe);
      }
    }
  }

  export namespace Merge {
    enum mergeTypes {
      merge = "merge",
    }

    export interface merge {
      (tagname: string): void;
      (type: "merge", tag?: string): void;
      (type: keyof typeof mergeTypes | string, tag?: string): void;
    }

    export interface mergeExecutor {
      (
        this: MergeHandler,
        type: keyof typeof mergeTypes | string,
        tag?: string
      ): void;
    }

    class MergeExecutor extends Method.Executor<mergeExecutor> {
      execute: mergeExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class MergeHandler extends NewGit.Git.GitHandler<mergeExecutor> {
      static mergeTypes = mergeTypes;
      gitmerge = gitmerge;
    }

    export const merge: mergeExecutor = function (type, tag) {
      let tagvalue: string = "";
      // se c'è il valore tag allora è il tag
      if (tag !== undefined) {
        tagvalue = tag;
      }
      // type non è un valore incluso nell'enum, quindi è il
      // valore del tag
      else {
        tagvalue = type;
      }
      const command = `${this.gitmerge} ${tagvalue} --no-ff`;
      this.execSync(command, { raw: true });
    };

    export class Merge extends Method.Method<typeof mergeTypes, mergeExecutor> {
      constructor() {
        super(mergeTypes, MergeExecutor, MergeHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const mType = this.types.merge;
        const mHandler = new Handler(merge);
        const mExe = new Executor(mHandler);
        this.setCommand(mType, mExe);
      }
    }
  }

  export namespace Checkout {
    enum checkoutTypes {
      checkoutBranch = "checkoutBranch",
      checkoutAndCreate = "checkoutAndCreate",
    }

    export interface checkout {
      (type: string): string;
      (type: "checkoutAndCreate", branch: string): string;
      (type: "checkoutBranch", branch: string): string;
      (type: keyof typeof checkoutTypes, branch: string): string;
      (type: keyof typeof checkoutTypes | string, branch?: string): string;
    }

    export interface checkoutExecutor {
      (this: CheckoutHandler, type: string, branch?: string): string;
    }

    class CheckoutExecutor extends Method.Executor<checkoutExecutor> {
      execute: checkoutExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class CheckoutHandler extends NewGit.Git
      .GitHandler<checkoutExecutor> {
      static checkoutTypes = checkoutTypes;
      gitcheckout = gitcheckout;
    }

    export const checkoutAndCreate: checkoutExecutor = function (
      type,
      branch
    ): string {
      let branchvalue: string = "";
      if (branch) {
        branchvalue = branch;
      } else {
        branchvalue = type;
      }
      const command = `${this.gitcheckout} -b ${branchvalue}`;
      return this.execSync(command, { raw: true });
    };

    export const checkoutBranch: checkoutExecutor = function (type, branch) {
      let branchvalue: string = "";
      if (branch) {
        branchvalue = branch;
      } else {
        branchvalue = type;
      }
      const command = `${this.gitcheckout} ${branchvalue}`;
      return this.execSync(command, { raw: true });
    };

    export class Checkout extends Method.Method<
      typeof checkoutTypes,
      checkoutExecutor
    > {
      constructor() {
        super(checkoutTypes, CheckoutExecutor, CheckoutHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const cacType = this.types.checkoutAndCreate;
        const cacHandler = new Handler(checkoutAndCreate);
        const cacExe = new Executor(cacHandler);
        this.setCommand(cacType, cacExe);
        const cbType = this.types.checkoutBranch;
        const cbHandler = new Handler(checkoutBranch);
        const cbExe = new Executor(cbHandler);
        this.setCommand(cbType, cbExe);
      }
    }
  }

  export namespace Stash {
    enum stashTypes {
      makeStashRaw = "makeStashRaw",
    }

    enum stashCommands {
      list = "list",
    }

    export interface stash {
      (type: "makeStashRaw"): {
        reflog: string;
        subject: string;
      };
      (type: keyof typeof stashTypes): {
        reflog: string;
        subject: string;
      };
    }

    export interface stashExecutor {
      (this: StashHandler): {
        reflog: string;
        subject: string;
      };
    }

    class StashExecutor extends Method.Executor<stashExecutor> {
      execute: stashExecutor = () => {
        return this.handler.handle();
      };
    }

    export class StashHandler extends NewGit.Git.GitHandler<stashExecutor> {
      gitstash = gitstash;
      stashCommands = stashCommands;
      stashMakeStashRawFields = {
        reflog: GitLogFormat.reflogShort,
        subject: GitLogFormat.reflogSubject,
      };
      cwd = () => {
        return process.cwd();
      };
    }

    export const makeStashRaw: stashExecutor = function () {
      const command = `${this.gitstash} ${this.stashCommands.list} ${
        gitFlags.format
      }'${this.format(this.stashMakeStashRawFields)}'`;

      return this.execSync(command, {
        raw: true,
        cwd: this.cwd(),
        git: true,
      }) as unknown as { reflog: string; subject: string };
    };

    export class Stash extends Method.Method<typeof stashTypes, stashExecutor> {
      constructor() {
        super(stashTypes, StashExecutor, StashHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const msrType = this.types.makeStashRaw;
        const msrHandler = new Handler(makeStashRaw);
        const msrExe = new Executor(msrHandler);
        this.setCommand(msrType, msrExe);
      }
    }
  }

  export namespace ForEachRef {
    enum forEachRefTypes {
      makeAllRefs = "makeAllRefs",
    }

    export interface forEachRef {
      (type: "makeAllRefs", reftype: string, cwd?: string): string[];
      (type: keyof typeof forEachRefTypes, reftype: string, cwd?: string):
        | string[]
        | undefined;
    }

    export interface forEachRefExecutor {
      (this: ForEachRefHandler, reftype: string, cwd?: string):
        | string[]
        | undefined;
    }

    class ForEachRefExecutor extends Method.Executor<forEachRefExecutor> {
      execute: forEachRefExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class ForEachRefHandler extends NewGit.Git
      .GitHandler<forEachRefExecutor> {
      gitforeachref = gitForEachRef;
    }

    export const makeAllRefs: forEachRefExecutor = function (reftype, cwd) {
      const command = `${this.gitforeachref} ${gitFlags.format}'${commitObjectFields.refname}' refs/${reftype}/`;
      return this.execSync(command, {
        raw: true,
        cwd,
      })
        .split(splitters.return)
        .filter(Boolean);
    };

    export class ForEachRef extends Method.Method<
      typeof forEachRefTypes,
      forEachRefExecutor
    > {
      constructor() {
        super(forEachRefTypes, ForEachRefExecutor, ForEachRefHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const marType = this.types.makeAllRefs;
        const marHandler = new Handler(makeAllRefs);
        const marExe = new Executor(marHandler);
        this.setCommand(marType, marExe);
      }
    }
  }

  export namespace forEachRef {
    enum forEachRefTypes {
      makeAllRefs = "makeAllRefs",
    }

    export interface forEachRef {
      (type: "makeAllRefs", reftype: string, cwd?: string): string[];
      (type: keyof typeof forEachRefTypes, reftype: string, cwd?: string):
        | string[]
        | undefined;
    }

    export interface forEachRefExecutor {
      (this: ForEachRefHandler, reftype: string, cwd?: string):
        | string[]
        | undefined;
    }

    class ForEachRefExecutor extends Method.Executor<forEachRefExecutor> {
      execute: forEachRefExecutor = (...args) => {
        return this.handler.handle(...args);
      };
    }

    export class ForEachRefHandler extends NewGit.Git
      .GitHandler<forEachRefExecutor> {
      gitforeachref = gitForEachRef;
    }

    export const makeAllRefs: forEachRefExecutor = function (reftype, cwd) {
      const command = `${this.gitforeachref} ${gitFlags.format}'${commitObjectFields.refname}' refs/${reftype}/`;
      return this.execSync(command, {
        raw: true,
        cwd,
      })
        .split(splitters.return)
        .filter(Boolean);
    };

    export class ForEachRef extends Method.Method<
      typeof forEachRefTypes,
      forEachRefExecutor
    > {
      constructor() {
        super(forEachRefTypes, ForEachRefExecutor, ForEachRefHandler);
      }
      setCommands(): void {
        const { Handler, Executor } = this;
        const marType = this.types.makeAllRefs;
        const marHandler = new Handler(makeAllRefs);
        const marExe = new Executor(marHandler);
        this.setCommand(marType, marExe);
      }
    }
  }
}

export class Git extends NewGit {
  basename = path.basename;
  refs: Record<RefType, string[] | NewGit.Stash.StashValue[]>;

  #makeStashRaw(type: string, refs: any) {
    refs[type] = this.stash("makeStashRaw");
    return refs;
  }

  #makeCommitRaw(type: string, refs: any) {
    refs[type] = this.log("getRawCommit");
    return refs;
  }

  makeAllRefs(type: string, refs: any) {
    refs[type] = this.forEachRef("makeAllRefs", type);
    return refs;
  }

  makeRefs(cwd: string = this.cwd()) {
    // use cwd
    cwd;
    let refs = {} as Record<RefType, string[] | any>;
    const {
      commit,
      stash,
      // heads,
      // tags,
      // remotes,
      // worktrees,
    } = refTypes;

    refTypesArray.forEach(type => {
      if (type === stash) refs = this.#makeStashRaw(type, refs);
      else if (type === commit) refs = this.#makeCommitRaw(type, refs);
      else refs = this.makeAllRefs(type, refs);
    });
    return refs;
  }

  constructor() {
    super();
    this.refs = this.makeRefs();
  }

  // ////////////////////////////////////// fs
  isDirectory(path: string): boolean {
    return statSync(path).isDirectory();
  }

  // ////////////////////////////////////// status
  status(path: undefined, raw: undefined): string[];
  status(path: string, raw: true): string;
  status(path: undefined, raw: true): string;
  status(path?: string, raw?: boolean): string[] | string {
    let command: string, response: string | string[];
    if (path) command = `git status ${path}`;
    else command = `git status`;
    if (!raw) {
      response = execSync(command, {
        trim: true,
      }) as string[];
    } else {
      response = execSync(command, {
        raw: true,
      }) as string;
    }
    return response;
  }

  execSyncTrim = (command: string): string[] =>
    execSync(command, { trim: true });

  // ////////////////////////////////////// ls-files
  getUntracked(cwd: string = this.cwd()): string[] {
    return this.lsFiles("getUntracked", cwd);
  }

  // ////////////////////////////////////// rev-parse
  getBaseDir(): string {
    let result = this.revParse("baseDir") as [string];
    return result[0];
  }

  getCurrentBranch(pointer: string = "HEAD") {
    let cb = "currentBranch" as const;
    let result = this.revParse(cb, pointer) as [string];
    return result[0];
  }

  getHash(branch: string) {
    let hash = this.revParse("getHash", branch) as string;
    return hash.replace("\n", "");
  }

  // ////////////////////////////////////// log

  getCommit(head: string, cwd: string = this.cwd()): NewGit.Commit.CommitValue {
    return this.log("getCommit", head, cwd);
  }

  getDirectParentOfCommit(
    _hash: string,
    cwd: string = this.cwd(),
    has_parent: boolean
  ): NewGit.Log.CommitFields | null {
    return this.log("getDirectParentOfCommit", _hash, cwd, has_parent);
  }

  hasParentCommit(hash: string): boolean {
    return this.log("hasParentCommit", hash);
  }

  // ////////////////////////////////////// tag
  getTags(cwd: string = this.cwd()): NewGit.Tag.TagValue[] {
    return this.tag("getTags", cwd);
  }

  addTag(tag: string, commithash?: string) {
    return this.tag("addTag", tag, commithash);
  }

  deleteTag(tagname: string) {
    return this.tag("deleteTag", tagname);
  }

  // ////////////////////////////////////// branch
  getBranches(filter = "", ops: { object: boolean }) {
    // add filter
    if (filter === "") {
      if (ops) {
        return this.branch("getBranches", {
          object: true,
        });
      } else {
        return this.branch("getBranches");
      }
    } else {
    }
  }

  removeAllBranches(branches: string[], force?: boolean): string[] {
    while (branches.length > 0) {
      let current = branches.pop();
      if (current) {
        let result = this.removeBranch(current, force);
        console.log(result);
      }
    }
    return branches;
  }

  removeBranch(branch: string, force?: boolean) {
    if (force) {
      return this.branch("removeBranch", {
        branch: branch,
        force: true,
      });
    } else {
      return this.branch("removeBranch", branch);
    }
  }

  // ////////////////////////////////////// add

  stageFile(file: string) {
    return this.add("stageFile", file);
  }

  // ////////////////////////////////////// commit

  commitFile(file: string, message?: string) {
    return this.commit("commitFile", file, message);
  }

  // ////////////////////////////////////// merge

  // ////////////////////////////////////// checkout
  checkoutAndCreate(branch: string) {
    return this.checkout("checkoutAndCreate", branch);
  }

  #checoutAandDeleteB_v1(
    A: string,
    action: (brancha: string, branchb: string) => string,
    B: string
  ) {
    {
      let isCheckoutType =
        checkoutTypes[A as keyof typeof checkoutTypes] !== undefined;
      if (isCheckoutType) {
        throw new Error(errors.firstArg);
      }
      return action(A, B);
    }
  }

  #checkoutAndDeleteB_v2(A: string) {
    let action = (brancha: string, branchb: string): string => {
      let checkoutresult = this.checkout(brancha);
      console.log(checkoutresult);
      return this.removeBranch(branchb);
    };
    let throwit = () => {
      throw new Error(errors.firstArg);
    };
    const { checkoutAndCreate, checkoutBranch } = checkoutTypes;
    let actions = new Map();
    actions.set(checkoutBranch, throwit);
    actions.set(checkoutAndCreate, throwit);
    actions.set(undefined, action);
    let chosen_action = actions.get(A);
    return chosen_action();
  }

  checkoutADeleteB(A: string, B: string): string {
    let action = (brancha: string, branchb: string): string => {
      let checkoutresult = this.checkout(brancha);
      console.log(checkoutresult);
      return this.removeBranch(branchb);
    };
    const v2 = false;
    if (v2) {
      return this.#checkoutAndDeleteB_v2(A);
    } else return this.#checoutAandDeleteB_v1(A, action, B);
  }
}
