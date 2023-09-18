import { system } from "../../../FileSystem";
import { testEnvironment } from "@zionstate/test";
import { ZaionVGit } from "../../../src/Git/ZaionVGit";
import * as fs_ from "fs";

const { expect, log } = testEnvironment();
expect;
log;

describe("if ZaionVGit function is correctly exported", () => {
  const regex = /ZaionVGit/g;
  const name = ZaionVGit.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named ZaionVGit", () => {
    expect(res).to.be.true;
  });
});

describe("ZaionVGit functionalities", async function () {
  this.timeout(15000);
  it("should return the list of files of a repo", async function () {
    const git = new ZaionVGit("test");
    await git
      .setDepth(100)
      .setRef("new-features/apps/zion-and-tests")
      .clone()
      .catch(e => {
        log(e);
        this.skip();
      });
    await git.fetch();
    const list = await git.ls();
    const fs = git.fs;
    const memory =
      process.memoryUsage().heapTotal / 1024 / 1024;
    log("memory:", memory);
    const readDirSync = fs.readdirSync(git.options.dir, {
      withFileTypes: true,
    });
    const branches = await git.listBranches();
    system.setfs(fs as unknown as typeof fs_);
    system.buildTree(git.options.dir);
    log("ls: ", list);
    log("branches: ", branches);
    log("readDirSync: ", readDirSync);
  });
});
