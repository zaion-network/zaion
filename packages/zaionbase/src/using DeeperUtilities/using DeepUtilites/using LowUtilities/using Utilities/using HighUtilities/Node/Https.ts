import https from "https";

declare module "./Https" {
  interface httpRequest {
    <T>(options: {
      hostname: string;
      path: string;
      method: string;
      headers?: any;
      body?: any;
    }): (payload?: string) => Promise<T>;
  }
}

declare module "../../../../../../Node" {
  namespace Node {
    interface Https {
      httpRequest: httpRequest;
    }
    namespace Https {}
  }
}

export namespace Https {
  export function httpRequest<T>(options: {
    hostname: string;
    path: string;
    method: string;
    headers?: any;
    body?: any;
  }): (payload?: string) => Promise<T> {
    return function (payload?: string) {
      return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
          let data = "";
          res.on("data", chunk => {
            data += chunk;
          });
          res.on("end", () => {
            const response = JSON.parse(data);
            resolve(response);
          });
        });

        req.on("error", error => {
          reject(error);
        });
        if (payload) req.write(payload);

        req.end();
      });
    };
  }
  export namespace httpRequest {
    export enum requestTypes {
      get = "GET",
      post = "POST",
      delete = "DELETE",
    }
  }
}

export function httpRequest<T>(options: {
  hostname: string;
  path: string;
  method: string;
  headers?: any;
  body?: any;
}): (payload?: string) => Promise<T> {
  return function (payload?: string) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = "";
        res.on("data", chunk => {
          data += chunk;
        });
        res.on("end", () => {
          const response = JSON.parse(data);
          resolve(response);
        });
      });

      req.on("error", error => {
        reject(error);
      });
      if (payload) req.write(payload);

      req.end();
    });
  };
}
