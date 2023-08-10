import { ObjectUtils } from "./ObjectUtils";
import { HigherUtilities } from "../HigherUtilites";
import { Nostr } from "/Users/WAW/Desktop/Als Analyzer Project/Nostr/Nip_098";

const test1 = () => {
  const objectKeys = () => {
    const testObj = { name: "ciao", surname: "booo" };
    const res1 = ObjectUtils.objectkeys(testObj);
    console.log(res1);
  };
  objectKeys();
};

const test2 = () => {
  const startsWithString =
    HigherUtilities.JavaScript.ArrayUtils.FilterCallbacks.startsWithString;
  const filterArray = HigherUtilities.JavaScript.ArrayUtils.filterArray;

  const startsWithNip_ = startsWithString(`Nip_`);

  const getKeyInObjOfObjWithFilterMaker =
    HigherUtilities.JavaScript.ObjectUtils.getKeyInObjOfObjWithFilterMkr;

  const getKeyInObjOfObj = getKeyInObjOfObjWithFilterMaker(
    filterArray,
    startsWithString,
    Object.keys
  );
  const obbo = {
    not_1: { ciao: [{ name: "tony" }, { name: "john" }], winnie: "poo" },
    not_2: { ciao: [{ name: "wowo" }, { name: "dolce" }] },
  };
  const foo = getKeyInObjOfObj(obbo, `not_`)(obbo.not_1, "ciao", (e) => e.name);
  const getKindsInNip = getKeyInObjOfObj(Nostr, `nip_`)(
    Nostr.Nip_001.nip_001,
    "kinds",
    (k) => k.description
  );
  const getTagsInNip = getKeyInObjOfObj(Nostr, `nip_`)(
    Nostr.Nip_001.nip_001,
    "tags",
    (t) => t.name
  );
  const kindsInNip = filterArray(Object.keys(Nostr), startsWithNip_).map(
    getKindsInNip
  );
  const tagsInNip = filterArray(Object.keys(Nostr), startsWithNip_).map(
    getTagsInNip
  );
  console.log(kindsInNip);

  // console.log(kindsInNip.filter((e) => e[1].length > 0));
  // console.log(tagsInNip.filter((e) => e[1].length > 0));
};
