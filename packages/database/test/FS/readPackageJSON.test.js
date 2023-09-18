import { testEnvironment } from "@zionstate/test";
import { readPackageJSON } from "@zionstate/system";

const { expect, log } = testEnvironment();

const path =
  "/Users/WAW/Documents/Projects/ZION/packages/@zionstate/system/package.json";

describe(`Method readPackageJSON()`, () => {
  it(`it should retrieve an object with correct members`, () => {
    let res = readPackageJSON(path);
    log(Object.keys(res.dependencies));
  });
});
