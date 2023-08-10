import { compareObj as c } from "./compareObj";

const compareObj = () => {
  const obj1 = { name: "ciao" };
  const obj2 = { name: "ciao" };
  const obj3 = { name: "ciaoss" };

  const res1 = c(obj1, obj2);
  const res2 = c(obj1, obj3);
  console.log(res1);
  console.log(res2);
};
compareObj();
