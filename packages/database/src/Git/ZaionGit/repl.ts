import { NewGit } from "./NewGit.type";
import { Git } from "./Git";

type ListElement = [string, () => void, () => void];

let newgit = new NewGit();
let git = new Git();

function measurePerformance(
  fn: () => void,
  n: number
): { total: number; average: number } {
  const results = Array.from({ length: n }, () => {
    const start = performance.now();
    fn();
    const stop = performance.now();
    return stop - start;
  });
  const total = results.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const average = total / n;
  return { total, average };
}

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / lsfiles
const gitLsFiles = () => git.lsFiles("./");
const newGitLsFiles = () =>
  newgit.lsFiles("getUntracked", "./");

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / revparse
const gitRevParseBaseDir = () => git.revParse("baseDir");
const newGitRevParseBaseDir = () =>
  newgit.revParse("baseDir");

const gitRevParseCurrBranch = () =>
  git.revParse("currentBranch", "HEAD");
const newgitRevParseCurrBranch = () =>
  newgit.revParse("currentBranch", "HEAD");

const gitRevParseGetHash = () =>
  git.revParse("getHash", "HEAD");
const newgitRevParseGetHash = () =>
  newgit.revParse("getHash", "HEAD");

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / log
const gitLogGetCommit = () => git.log("getCommit", "HEAD");
const targets = newgit.branch("mergeTargets", "HEAD");
// need merge targets
const newGitLogGetCommit = () =>
  newgit.log("getCommit", "HEAD", "./", targets);

let gitLogGetDirect = () =>
  git.log("getDirectParentOfCommit", "HEAD");
// needs has partent
let hasParent = newgit.log("hasParentCommit", "HEAD");
let newgitLogGetDirect = () =>
  newgit.log(
    "getDirectParentOfCommit",
    "HEAD",
    "./",
    hasParent
  );

let gitlogGetRawCommit = () => git.log("getRawCommit");
let newgitlogGetRawCommit = () =>
  newgit.log("getRawCommit");

let gitLogHasParent = () =>
  git.log("hasParentCommit", "HEAD");
let newgitLogHasParent = () =>
  newgit.log("hasParentCommit", "HEAD");

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / tag

let gitTagAdd = () => git.tag("addTag", "test/tag");
let newgitTagAdd = () => newgit.tag("addTag", "test/tag");

let tagAdd: ListElement = [
  "tag_addTag",
  gitTagAdd,
  newgitTagAdd,
];

let gitTagDelete = () => git.tag("deleteTag", "test/tag");
let newgitTagDelete = () =>
  newgit.tag("deleteTag", "test/tag");

let tagDelete: ListElement = [
  "tag_deleteTag",
  gitTagDelete,
  newgitTagDelete,
];

let gitTagGetTags = () => git.tag("getTags");
let newgitTagGetTags = () => newgit.tag("getTags");

let tagGetTags: ListElement = [
  "tag_getTags",
  gitTagGetTags,
  newgitTagGetTags,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / branch
let gitBranchGetBranch = () =>
  git.branch("getBranch", "refs/heads/zaion/dev");
// needs getCommit which needs MergTargets

const targets2 = newgit.branch(
  "mergeTargets",
  "refs/heads/zaion/dev"
);
let commit = newgit.log(
  "getCommit",
  "refs/heads/zaion/dev",
  "./",
  targets2
);
let newgitBranchGetBranch = () =>
  newgit.branch(
    "getBranch",
    "refs/heads/zaion/dev",
    commit
  );

let gitBranchGetBranches = () => git.branch("getBranches");
let newgitBranchGetBranches = () =>
  newgit.branch("getBranches");

let gitBranchMergeTargets = () =>
  git.branch("mergeTargets", "refs/heads/stage");
let newgitBranchMergeTargets = () =>
  newgit.branch("mergeTargets", "refs/heads/stage");

// missing remove branch
let gitBranchRemove = () =>
  git.branch("removeBranch", "test/branch");
let newgitBranchRemove = () =>
  newgit.branch("removeBranch", "test/branch");

let branch_removeBranch: ListElement = [
  "branch_removeBranch",
  gitBranchRemove,
  newgitBranchRemove,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / add
let file = "./packages/database/src/Git/ZaionGit/test.txt";
let gitAddStage = () => git.add("stageFile", file);
let newgitAddStage = () => newgit.add("stageFile", file);

let add_stageFile: ListElement = [
  "add_stageFile",
  gitAddStage,
  newgitAddStage,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / commit

let gitCommitFile = () =>
  git.commit("commitFile", file, "test");
let newgitCommitFile = () =>
  newgit.commit("commitFile", file, "test");

let commit_commitFile: ListElement = [
  "commit_commitFile",
  gitCommitFile,
  newgitCommitFile,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / merge
// TODO

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / checkout

let gitCheckoutAndCreate = () =>
  git.checkout("checkoutAndCreate", "test/branch");
let newgitCheckoutAndCreate = () =>
  newgit.checkout("checkoutAndCreate", "test/branch");

let checkout_checkoutAndCreate: ListElement = [
  "checkout_checkoutAndCreate",
  gitCheckoutAndCreate,
  newgitCheckoutAndCreate,
];

let gitCheckoutBranch = () =>
  git.checkout("checkoutBranch", "zaion/dev");
let newgitCheckoutBranch = () =>
  newgit.checkout("checkoutBranch", "zaion/dev");

let checkout_checkoutBranch: ListElement = [
  "checkout_checkoutBranch",
  gitCheckoutBranch,
  newgitCheckoutBranch,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / stash

let gitStashMakeRaw = () => git.stash("makeStashRaw");
let newgitStashMakeRaw = () =>
  newgit.stash("makeStashRaw");

let stash_makeStashRaw: ListElement = [
  "stash_makeStashRaw",
  gitStashMakeRaw,
  newgitStashMakeRaw,
];

// ///////////////// ////// ///////////////// //// //////// / / / / / / / / / forEachRef

let gitForEachMakeAll = () =>
  git.forEachRef("makeAllRefs", "heads");
let newgitForEachMakeAll = () =>
  newgit.forEachRef("makeAllRefs", "heads");

let forEachRef_makeAllRefs: ListElement = [
  "forEachRef_makeAllRefs",
  gitForEachMakeAll,
  newgitForEachMakeAll,
];

let list: ListElement[] = [
  ["lsFiles", gitLsFiles, newGitLsFiles],
  [
    "revParse_baseDir",
    gitRevParseBaseDir,
    newGitRevParseBaseDir,
  ],
  [
    "revParse_currentBranch",
    gitRevParseCurrBranch,
    newgitRevParseCurrBranch,
  ],
  [
    "revParse_getHash",
    gitRevParseGetHash,
    newgitRevParseGetHash,
  ],
  ["log_getCommit", gitLogGetCommit, newGitLogGetCommit],
  [
    "log_getDirectParent",
    gitLogGetDirect,
    newgitLogGetDirect,
  ],
  [
    "log_getRawCommit",
    gitlogGetRawCommit,
    newgitlogGetRawCommit,
  ],
  [
    "log_hasParentCommit",
    gitLogHasParent,
    newgitLogHasParent,
  ],
  // tagAdd,
  // tagDelete,
  tagGetTags,
  [
    "branch_getBranch",
    gitBranchGetBranch,
    newgitBranchGetBranch,
  ],
  [
    "branch_getBranches",
    gitBranchGetBranches,
    newgitBranchGetBranches,
  ],
  [
    "branch_mergeTargets",
    gitBranchMergeTargets,
    newgitBranchMergeTargets,
  ],
  // branch_removeBranch,

  // add_stageFile,

  // commit_commitFile,

  // checkout_checkoutAndCreate,
  // checkout_checkoutBranch,
  stash_makeStashRaw,
  forEachRef_makeAllRefs,
];

function compareFunctions<T>(
  fn1: () => void,
  fn2: () => void,
  n: number,
  reportFn: (results: {
    [key: string]: { total: number; average: number };
  }) => T
): T {
  const results = {
    [fn1.name]: measurePerformance(fn1, n),
    [fn2.name]: measurePerformance(fn2, n),
  };
  return reportFn(results);
}

const customReporter = (
  results: Record<
    string,
    { total: number; average: number }
  >
) => {
  const sortedResults = Object.entries(results).sort(
    ([_, value1], [__, value2]) => {
      return value1.average - value2.average;
    }
  );

  return {
    winner: sortedResults[0][0],
    results: sortedResults.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    ),
  };
};

function compareAllFunctions(
  list: [string, () => void, () => void][],
  times: number
): Record<string, ReturnType<typeof customReporter>> {
  let response: Record<
    string,
    ReturnType<typeof customReporter>
  > = {};
  list.forEach(pair => {
    const results = compareFunctions(
      pair[1],
      pair[2],
      times,
      customReporter
    );
    response[pair[0]] = results;
  });
  return response;
}

let res = compareAllFunctions(list, 1);
