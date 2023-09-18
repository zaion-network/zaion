import { testEnvironment } from "@zionstate/test";

const { expect, log } = testEnvironment();
expect;
log;

describe("if function_name function is correctly exported", () => {
  log("ciao");
});
