import { createHash, createHmac } from "crypto";

export class Crypto {}
export namespace Crypto {
  export const hmacIt: hmacIt.hmacIt = (secret: string, value: string) =>
    createHmac("sha256", secret).update(value).digest("hex");
  export namespace hmacIt {
    export interface hmacIt {
      (secret: string, value: string): string;
    }
  }

  export const hashIt: hashIt.hashIt = (string) => {
    const hash = createHash("sha256");
    hash.update(string);
    const hex = hash.digest("hex");
    hash.destroy();
    return hex;
  };
  export namespace hashIt {
    export interface hashIt {
      (string: string): string;
    }
  }
}
