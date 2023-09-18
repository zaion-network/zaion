import { readJSON } from "@zionstate/system";
import { testEnvironment } from "@zionstate/test";

const { expect, log } = testEnvironment();

const testObj = { prova: ["ciao", "w0rld"] };
const path =
  "/Users/WAW/Documents/Projects/ZION/packages/@zionstate/system/test/prova.json";

describe(`Method readJSON()`, () => {
  it(`it should return the test object`, () => {
    let res = readJSON(path);
    expect(Array.isArray(res.prova)).to.be.true;
    expect(res.prova[0]).to.be.equal(testObj.prova[0]);
    expect(res.prova[1]).to.be.equal(testObj.prova[1]);
  });
});

const res = readJSON(path);
console.log(res);
