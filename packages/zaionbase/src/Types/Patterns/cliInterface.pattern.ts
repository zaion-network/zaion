export {};
interface CommonOptions {
  q?: boolean;
  f?: boolean;
  m?: boolean;
}
interface StartPoint {
  startPoint?: string;
}
type Options<D, b, B, O, C> = D extends true
  ? { detach: D; branch?: string; commit?: string }
  : b extends true
  ? { newBranch: string; b: true } & StartPoint
  : B extends true
  ? { newBranch: string; B: true } & StartPoint
  : O extends true
  ? { newBranch: string; orphan: true } & StartPoint
  : C extends string
  ? { detach?: true; commit: string }
  : { detach?: D; b?: b; B?: B; orphan?: O; commit?: C };
interface goo {
  <D, b, B, O, C>(o: Options<D, b, B, O, C> & CommonOptions): void;
}

const checkout: goo = o => {};
checkout({ detach: true, branch: "any" });
checkout({ b: true, newBranch: "any" });
checkout({ B: true, newBranch: "any" });
checkout({ orphan: true, newBranch: "any", startPoint: "here" });
checkout({ commit: "", detach: true });
checkout({});

enum subCommands {
  a = "a",
  b = "b",
}
type Ops<S> = S extends typeof subCommands.a
  ? { sub: typeof subCommands.a; a_arg: string }
  : S extends typeof subCommands.b
  ? { sub: typeof subCommands.b; b_arg: string }
  : { sub?: S };
interface subCommand {
  <S>(ops: Ops<S>): void;
}
const sub: subCommand = ops => {
  ops;
};

sub({ sub: subCommands.a, a_arg: "" });
sub({ sub: subCommands.b, b_arg: "" });
sub({});
