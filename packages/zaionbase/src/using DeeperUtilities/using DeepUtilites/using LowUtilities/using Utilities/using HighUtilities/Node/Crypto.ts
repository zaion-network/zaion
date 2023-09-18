import { createHash, createHmac } from "crypto";
import "../../../../../../Node";

declare module "./Crypto" {
  namespace hmacIt {
    interface hmacIt {
      (secret: string, value: string): string;
    }
  }
  namespace hashIt {
    interface hashIt {
      (string: string): string;
    }
  }
}

declare module "../../../../../../Node" {
  namespace Node {
    interface Crypto {
      hmacIt: hmacIt.hmacIt;
      hashIt: hashIt.hashIt;
    }
    namespace Crypto {}
  }
}

export const hmacIt: hmacIt.hmacIt = (secret: string, value: string) =>
  createHmac("sha256", secret).update(value).digest("hex");

export const hashIt: hashIt.hashIt = string => {
  const hash = createHash("sha256");
  hash.update(string);
  const hex = hash.digest("hex");
  hash.destroy();
  return hex;
};

export class Crypto {}
export namespace Crypto {
  export const hmacIt: hmacIt.hmacIt = (secret: string, value: string) =>
    createHmac("sha256", secret).update(value).digest("hex");

  export const hashIt: hashIt.hashIt = string => {
    const hash = createHash("sha256");
    hash.update(string);
    const hex = hash.digest("hex");
    hash.destroy();
    return hex;
  };
}
