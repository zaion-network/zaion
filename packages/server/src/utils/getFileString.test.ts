import { describe, it, expect } from "bun:test";
import { getFileString } from "./getFileString";

describe("getFileString", () => {
  it("string", async () => {
    let path;
    if (process.cwd() === "/home/ubuntu/bunmonorepo") {
      path = "./packages/pack3/src/utils/getFileString.ts";
    } else if (process.cwd() === "/home/ubuntu/bunmonorepo/packages/pack3") {
      path = "./src/utils/getFileString.ts";
    } else {
      path = "./getFileString.ts";
    }
    const expected = `export const getFileString = async (path: string) => {\n  return (await Bun.file(path).text())\n}`;
    const string = await getFileString(path);
    expect(string).toEqual(expected);
    console.log(string);
  });
});
