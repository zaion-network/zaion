import { testEnvironment } from "@zionstate/test";
import { utils } from "@zionstate/zionbase";
import { ZionGit } from "../../../src/Git";

const removeDirectoryLevels =
  utils.node.zionUtil.removeDirectoryLevels;

const { expect, log } = testEnvironment();
expect;
log;

const path = process.cwd();
const root = removeDirectoryLevels(path, 5);
const ziongit = new ZionGit(root);

describe("if ZionGit function is correctly exported", () => {
  const regex = /ZionGit/g;
  const name = ZionGit.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named ZionGit", () => {
    expect(res).to.be.true;
  });
});

describe("ZionGit", async () => {
  it("dovrebbe ritornare true perchè il repo è un folder git", async () => {
    const res = await ziongit.isRepo();
    expect(res).to.be.true;
  });
});

describe("git object", () => {
  const git = ziongit.git;
  it("", async () => {
    // Esegue il comando `git rev-parse abc123^{tree}`
    const treeHash = await git.raw([
      "rev-parse",
      "f3aba5a",
    ]);
    log(treeHash);

    // Esegue il comando `git ls-tree treeHash`
    const result = await git.raw([
      "ls-tree",
      "-r",
      "f3aba5a",
    ]);
    log("", result);
  });
});
