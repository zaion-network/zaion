import {
  test,
  beforeEach,
  describe,
  expect,
  spyOn,
  mock,
  it,
  afterEach,
} from "bun:test";
import { sendFileResponse, SimpleServer } from "..";
import { getFileString } from "..";

describe("sendFileResonse()", async () => {
  it("should", async () => {
    const res = await sendFileResponse(
      SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
      SimpleServer.Header.ContentTypeValues.TEXT_HTML,
      ""
    );
    expect(res).toBeInstanceOf(Response);
    console.log(res);
  });
});
