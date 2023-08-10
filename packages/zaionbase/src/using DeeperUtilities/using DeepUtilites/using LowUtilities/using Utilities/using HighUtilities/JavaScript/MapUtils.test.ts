import { MapUtils } from "./MapUtils";

const stringifyMap = () => {
  const map = new Map();
  map.set(1, "ciao");
  map.set(2, "miao");
  const string = MapUtils.stringifyMap(map);
  console.log(string);
};
stringifyMap();
