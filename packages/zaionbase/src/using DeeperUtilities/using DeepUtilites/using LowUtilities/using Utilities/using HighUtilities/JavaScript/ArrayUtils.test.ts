import { ArrayUtils } from "./ArrayUtils";

const ensureArray = () => {
  console.log(ArrayUtils.ensureArray([""]));
};
ensureArray();

const replace = () => {
  const arr = Array(10)
    .fill("")
    .map((_, idx) => `boom-${idx}`);
  const replace = ArrayUtils.MapCallbacks.replacer;
  const res = arr.map(replace("boom", "boomba"));
  console.log(res);
};
replace();
