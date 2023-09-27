import { sendFileResponse } from "./utils/sendFileResponse";

/**
 * SimpleServer handles HTML, JS and CSS files located respectively:
 * - root/index.html
 * - root/dist/index.js
 * - root/assets/style.css
 *
 * it handles files requested from assets of this file type:
 * - js
 * - svg
 * - ico
 * - ttf
 * - woff
 */
export class SimpleServer {
  #server;
  constructor(
    port: number,
    cb: (req: Request) => Promise<boolean>,
    handler: (request: Request) => Promise<Response> = SimpleServer.handler(cb)
  ) {
    this.#server = Bun.serve({
      port,
      fetch: handler,
    });
    console.log(`Server is listening on port: `, this.#server.port);
  }
  get server() {
    return this.#server;
  }
}
export namespace SimpleServer {
  const headers = {};
  export enum paths {
    css = "./assets/style.css",
    js = "./dist/index.js",
    index = "./index.html",
    manifest = "./manifest.json",
  }
  export enum pathnames {
    css = "/assets/style.css",
    js = "/dist/index.js",
    manifest = "/manifest.json",
  }
  export const handler =
    (cb: (req: Request) => Promise<boolean>) => async (req: Request) => {
      const { CONTENT_TYPE } = SimpleServer.Header.HeaderKeys;
      const {
        TEXT_JAVASCRIPT,
        TEXT_CSS,
        APPLICATION_JSON,
        IMAGE_SVGXML,
        IMAGE_XICON,
        IMAGE_PNG,
        IMAGE_GIF,
        IMAGE_JPEG,
        FONT_TTF,
        FONT_WOFF,
      } = SimpleServer.Header.ContentTypeValues;
      const url = new URL(req.url);
      const path = url.pathname;
      const cbreturn = await cb(req);
      if (cbreturn !== undefined) return new Response(`${cbreturn}`);
      if (path === SimpleServer.pathnames.css)
        return sendFileResponse(CONTENT_TYPE, TEXT_CSS, SimpleServer.paths.css);
      if (path === SimpleServer.pathnames.js) {
        return sendFileResponse(
          CONTENT_TYPE,
          TEXT_JAVASCRIPT,
          SimpleServer.paths.js
        );
      }
      if (path === SimpleServer.pathnames.manifest) {
        return sendFileResponse(
          CONTENT_TYPE,
          APPLICATION_JSON,
          SimpleServer.paths.manifest
        );
      }
      if (path.includes("/assets/")) {
        const extension = path.split(".").pop();

        const map = new Map();
        map.set("js", TEXT_JAVASCRIPT);
        map.set("css", TEXT_CSS);
        map.set("svg", IMAGE_SVGXML);
        map.set("png", IMAGE_PNG);
        map.set("ico", IMAGE_XICON);
        map.set("ttf", FONT_TTF);
        map.set("woff", FONT_WOFF);
        const contentType = map.get(extension);
        if (!contentType)
          throw new Error(
            "This type of file is not yet suppored by the server."
          );
        if (
          contentType === IMAGE_PNG ||
          contentType === IMAGE_XICON ||
          contentType === IMAGE_GIF ||
          contentType === IMAGE_JPEG
        ) {
          const file = Bun.file(`.${path}`);
          return new Response(file);
        }
        return sendFileResponse(
          SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
          contentType,
          `.${path}`
        );
      } else {
        return sendFileResponse(
          SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
          SimpleServer.Header.ContentTypeValues.TEXT_HTML,
          SimpleServer.paths.index
        );
      }
    };
  export namespace Header {
    export enum HeaderKeys {
      ACCEPT = "Accept",
      ACCEPT_CHARSET = "Accept-Charset",
      ACCEPT_ENCODING = "Accept-Encoding",
      AUTHORIZATION = "Authorization",
      CACHE_CONTROL = "Cache-Control",
      CONTENT_LENGTH = "Content-Length",
      CONTENT_TYPE = "Content-Type",
      COOKIE = "Cookie",
      DATE = "Date",
      HOST = "Host",
      IF_MODIFIED_SINCE = "If-Modified-Since",
      IF_NONE_MATCH = "If-None-Match",
      IFRAME_OPTIONS = "Iframe-Options",
      KEEP_ALIVE = "Keep-Alive",
      ORIGIN = "Origin",
      PROXY_AUTHORIZATION = "Proxy-Authorization",
      REFERER = "Referer",
      USER_AGENT = "User-Agent",
    }
    export enum ContentTypeValues {
      TEXT_HTML = "text/html",
      TEXT_PLAIN = "text/plain",
      TEXT_CSS = "text/css",
      TEXT_JAVASCRIPT = "text/javascript",
      APPLICATION_JSON = "application/json",
      APPLICATION_XML = "application/xml",
      APPLICATION_ZIP = "application/zip",
      APPLICATION_PDF = "application/pdf",
      APPLICATION_SQL = "application/sql",
      APPLICATION_GRAPHQL = "application/graphql",
      APPLICATION_LD_JSON = "application/ld+json",
      APPLICATION_MSWORD = "application/msword",
      APPLICATION_VND_MS_EXCEL = "application/vnd.ms-excel",
      APPLICATION_VND_MS_POWERPOINT = "application/vnd.ms-powerpoint",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      IMAGE_PNG = "image/png",
      IMAGE_JPEG = "image/jpeg",
      IMAGE_GIF = "image/gif",
      IMAGE_SVGXML = "image/svg+xml",
      IMAGE_XICON = "image/x-icon",
      FONT_TTF = "font/ttf",
      FONT_WOFF = "font/woff",
    }
  }
}
