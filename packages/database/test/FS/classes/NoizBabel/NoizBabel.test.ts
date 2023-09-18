import { testEnvironment } from "@zionstate/test";
import { NoizBabel } from "../../../../src/FS/classes/NoizBabel";

const { expect, log } = testEnvironment();
expect;
log;

describe("if NoizBabel function is correctly exported", () => {
  const regex = /NoizBabel/g;
  const name = NoizBabel.name;
  const res = regex.test(name);
  it("shall confirm the existance of a function named NoizBabel", () => {
    expect(res).to.be.true;
  });
});

describe("NoizBabel_v1", () => {
  describe("with", () => {
    const noizBabel = new NoizBabel({
      code: `
      type Prova = {
        name:string;
      }
    `,
    });
    const result = noizBabel
      .traverse()
      .with("getProperties").stringResult;
    it("should modify the object by setting its `stringResult` property to the value of the plugin's `stringResult` property and calling the `traverse` function with the object's `ast` property and the visitor object of the plugin", () => {
      expect(result).to.be.deep.equal(["name"]);
    });
  });
});
