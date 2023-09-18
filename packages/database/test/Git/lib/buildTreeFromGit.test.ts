import { testEnvironment } from "@zionstate/test";
import { node } from "@zionstate/zionbase/utils";
import { system } from "../../../FileSystem";
import { buildTreeFromGit as buildTree } from "../../../src/Git/lib/buildTreeFromGit";
// import { lib } from "../../../Git";
// const buildTree = lib.buildTreeFromGit;
const { expect, log } = testEnvironment();
expect;
log;

const removeDirectoryLevels =
  node.zionUtil.removeDirectoryLevels;
const path = process.cwd();
const root = removeDirectoryLevels(path, 5);
const folders = system
  .arrayOfFoldersInDirectory(root)
  .map(e => e.name);
log(root);

describe("if buildTreeFromGit_v1 function is correctly exported", () => {
  const regex = /buildTreeFromGit_v1/g;
  const name = buildTree.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named buildTreeFromGit_v1", () => {
    expect(res).to.be.true;
  });
});

describe("it should build an array of nodes", async () => {
  it("should return false as there all folders in the repo as also contained in network-state", async function () {
    this.timeout(40000);
    const tree = await buildTree("3244d99", root);
    const foldersInRepo = tree
      .filter(e => !e.isFile)
      .map(e => e.name);
    const cond = foldersInRepo
      .map(e => folders.includes(e))
      .some(v => v === false);
    log("", cond);
    expect(cond).to.be.false;
  });
});
