import { ErrorHandler } from "./ErrorHandler";

const cb = ErrorHandler.errorCb("boom");
try {
  cb();
} catch (error: any) {
  console.log("got an error!!: ", error.message);
}
