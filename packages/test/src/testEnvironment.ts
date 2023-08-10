import chai, { expect } from "chai";
import promise from "chai-as-promised";
import Mocha from "mocha";
import { debuglog, DebugLogger } from "util";

chai.use(promise);

export type testEnvironmentReturn = {
  expect: Chai.ExpectStatic;
  log: DebugLogger;
  debuglog: typeof debuglog;
};

/**
 *
 * @returns
 */
export const testEnvironment = (
  amount: number = 1000
): testEnvironmentReturn => {
  const testRunner = new Mocha({ slow: amount });
  testRunner.suite.emit(
    "pre-require",
    global,
    "nofile",
    testRunner
  );
  var suiteRun = testRunner.run();
  process.on("exit", code => {
    const stats = suiteRun.stats;
    const cond = stats!.failures > 0;
    const message = stats ? (cond ? 1 : 0) : code;
    process.exit(message);
  });
  let log = debuglog("log");
  return {
    expect,
    log,
    debuglog,
  };
};
