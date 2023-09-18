import { testEnvironment } from "@zionstate/test";
import { existsSync } from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import {
  ZionYaml,
  NoizYaml,
  system,
} from "../../../../FileSystem";

const { expect, log } = testEnvironment();
expect;
log;

const obj = {
  object: { name: "object" },
  array: ["cool", "stuff"],
  string: "string",
  number: 10,
};
const currPath = process.cwd();
const FILE0 = "test.yaml";
const FILE1 = "test_temp.yaml";
const FILE2 = "temp.yaml";
const TEST_YAML = `
object:
  name: object
array:
  - cool
  - stuff
string: string
number: 10
`;
const pwd = currPath;
const file_path0 = path.join(currPath, FILE0);
const file_path1 = path.join(pwd, FILE1);
const file_path2 = path.join(currPath, FILE2);
log("", file_path0);
system.writeFileSync(file_path0, TEST_YAML);
const yaml = new NoizYaml<typeof obj>(file_path0).parsed;
const newexec = promisify(exec);

describe("if ZionYaml function is correctly exported", () => {
  const regex = /NoizYaml_v2/g;
  const name = ZionYaml.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named ZionYaml", () => {
    expect(res).to.be.true;
  });
});

describe("if NoizYaml function is correctly exported", () => {
  const regex = /NoizYaml_v2/g;
  const name = NoizYaml.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named ZionYaml", () => {
    expect(res).to.be.true;
  });
});

describe("NoizYaml functionalities", () => {
  const test1 = obj.array[0] === yaml.array[0];
  const test2 = obj.array[0] === yaml.array[0];
  const test3 = obj.object.name === yaml.object.name;
  const test4 = obj.string === yaml.string;
  const test5 = obj.number === yaml.number;
  expect(test1).to.be.true;
  expect(test2).to.be.true;
  expect(test3).to.be.true;
  expect(test4).to.be.true;
  expect(test5).to.be.true;
});

describe("NoizYaml write file", async () => {
  const PATH =
    "/Users/WAW/Documents/Projects/noiz-network-state/packages/database/test/FS/classes/ZaionYaml\n";
  exec("echo $PWD", (error, stdout, stderr) => {
    if (error) throw new Error(error.message);
    expect(stdout).to.be.equal(PATH);
    stderr;
  });
  const TESTO = "'test: qui\n'";
  const TESTO_TEST = "qui";
  const ADDED_TEXT = "ciao";
  const COMMAND1 = `touch ${FILE1}`;
  const COMMAND2 = `echo ${TESTO} > ${FILE1}`;
  await newexec(COMMAND1);
  await newexec(COMMAND2);
  if (!existsSync(file_path1)) throw new Error("no file");
  type file = {
    test: string;
    added: string;
  };
  const yaml = new NoizYaml<file>(file_path1);
  yaml.parsed.added = ADDED_TEXT;
  log("", yaml);
  yaml.write();
  const test = system.existsSync(file_path1);
  expect(yaml.parsed.test).to.be.equal(TESTO_TEST);
  expect(yaml.string).to.be.equal(TESTO);
  const testyaml = new NoizYaml<file>(file_path1);
  expect(testyaml.parsed.added).to.be.equal(ADDED_TEXT);
  // if (test) system.rmSync(file_path);
  test;
  // const COMMAND2 = `rm test_temp.yaml`;
  // await newexec(COMMAND2);
});

describe("NoizYaml without path arg", async () => {
  it("should create a file", () => {
    type file = { some: string; array: string[] };
    const yaml = new NoizYaml<file>();
    const SOME = "text";
    const ITEM1 = "ciao";
    log("", yaml);
    yaml.parsed.some = SOME;
    yaml.parsed.array = [ITEM1];
    yaml.write();
    expect(system.existsSync(file_path2)).to.be.true;
    // const testYaml = new NoizYaml<file>();
    // expect(testYaml.parsed.some).to.be.equal(SOME);
    // expect(testYaml.parsed.array[0]).to.be.equal(ITEM1);
    system.rmSync(file_path0);
    system.rmSync(file_path1);
    system.rmSync(file_path2);
  });
});
