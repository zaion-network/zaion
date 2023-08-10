import { Crypto } from "./Crypto";

const hashitdown = () => {
  const res = Crypto.hashIt("boooombastik");
  console.log(res);
};
hashitdown();
