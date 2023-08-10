import { JSONUtils } from "./JSONUtils";

const isJsonTest = async () => {
  const res1 = await JSONUtils.validateJson("ciao mamma");
  const res2 = await JSONUtils.validateJson("{mamma:'ciao'}");
  const res3 = await JSONUtils.validateJson("{'mamma':'ciao'}");
  const res4 = await JSONUtils.validateJson('{"mamma":"ciao"}');
  console.log(res1);
  console.log(res2);
  console.log(res3);
  console.log(res4);
};
isJsonTest();
