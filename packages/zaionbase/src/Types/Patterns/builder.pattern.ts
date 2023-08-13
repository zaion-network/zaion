class Some<
  A extends number | number[] | undefined = undefined,
  B extends string | string[] | undefined = undefined
> {
  constructor(public a: A = undefined as A, public b: B = undefined as B) {}
  setA<S extends number | number[]>(
    this: Some<undefined | number | number[], string | string[] | undefined>,
    a: S
  ) {
    this.a = a;
    return this as Some<S, this["b"]>;
  }
  setB<S extends string | string[]>(
    this: Some<undefined | number | number[], string | string[] | undefined>,
    b: S
  ) {
    this.b = b;
    return this as Some<this["a"], S>;
  }
  doit(this: Some<number, string>) {}
}

const some = new Some().setA(10).setB("");

const a = some.a;
//   ^?
const b = some.b;
//   ^?

some.doit();
