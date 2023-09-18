enum fooTypes {
  a = "a",
  b = "b",
  c = "c",
}

interface foo {
  <T extends "a">(type: T, a: number, b: string): number;
  <T extends "b">(type: T, a: string): string;
  <T, A>(type: T, a?: A): unknown;
}

const foo: foo = function (type: any) {
  console.log(type);
  return type as any;
};

let res = foo("a", 10, "10");
