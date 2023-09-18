interface action<Target, Result> {
  (target: Target, result: Result): void;
}

interface conditioner<Target> {
  (target: Target): boolean;
}

type InferActionTarget<T> = T extends action<infer T, infer R> ? T : never;
type InferActionResult<T> = T extends action<infer T, infer R> ? R : never;

interface runaction<
  A extends action<any, any>,
  Target extends InferActionTarget<A> = InferActionTarget<A>
> {
  (action: A): (e: Target) => ReturnType<A>;
}

interface recursor<
  A extends action<any, any>,
  Target extends InferActionTarget<A> = InferActionTarget<A>
> {
  (...args: Parameters<A>): (runaction: (e: Target) => void) => ReturnType<A>;
}

interface Recursor<
  Bool extends boolean,
  BoolFunc extends (...args: any[]) => boolean,
  Action extends (...args: any[]) => any,
  Condition extends Bool | BoolFunc,
  Runaction extends (...args: any[]) => (...args: any[]) => any,
  Recursor extends (...args: any[]) => (...args: any[]) => any,
  Conditioner extends (target: InferActionTarget<Action>) => boolean,
  Recursive extends (
    target: InferActionTarget<Action>,
    files: InferActionResult<Action>
  ) => void,
  Recurse extends (
    target: InferActionTarget<Action>,
    result: InferActionResult<Action>
  ) => (action: Recursive) => void
> {
  action: Action;
  condition: Condition;
  runaction: Runaction;
  recursor: Recursor;
  conditioner: Conditioner;
  recursive: Recursive;
  recurse: Recurse;
}

class Recursor<
  Bool,
  BoolFunc,
  Action,
  Condition,
  Runaction,
  Recursor,
  Conditioner,
  Recursive,
  Recurse
> {
  constructor(
    public action: Action,
    public condition: Condition,
    public runaction: Runaction,
    public recursor: Recursor
  ) {}

  conditioner = (target => {
    if (typeof this.condition === "boolean") {
      return this.condition;
    } else return this.condition(target);
  }) as Conditioner;

  recursive = ((target, result) => {
    if (this.conditioner(target)) this.recurse(target, result)(this.recursive);
    this.action(target, result);
  }) as Recursive;

  recurse = ((target, result) => action => {
    this.recursor(target, result)(this.runaction(action));
  }) as Recurse;
}

interface RecursorTypes {
  grafi: any;
  riduzioni: any;
  matrici: any;
  arrangiamenti: {
    commutazioni: {
      permutazione: any;
      trasposizione: any;
      sostituzioni: any;
      rotazioni: any;
    };
    combinazione: {
      duplicata: any;
      unica: any;
      vincolata: any;
    };
  };
}

/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////
/////

function random() {
  return Math.round(Math.random() * 10000000).toString(32);
}
export {};

class Some {
  #isDir: boolean;
  name: string;
  files: Some[] | null;
  constructor(isDir: boolean, files?: Some[]) {
    this.#isDir = isDir;
    this.name = random();
    files ? (this.files = files) : (this.files = null);
  }
  isDirectory() {
    return this.#isDir;
  }
}

const one = new Some(false);
const two = new Some(false);
const thr = new Some(false);
const fou = new Some(false);
const fiv = new Some(true, [
  new Some(false),
  new Some(false),
  new Some(true, [new Some(false)]),
]);
const first = new Some(true, [one, two, thr, fou, fiv]);
const files: string[] = [];

const action: action<Some, string[]> = (file, array) => array.push(file.name);

const conditioner: conditioner<Some> = file => file.isDirectory();

const runaction: runaction<typeof action> = action => e => action(e, files);

const recursor: recursor<typeof action> = (file, array) => runaction =>
  file.files!.forEach(runaction);

new Recursor(action, conditioner, runaction, recursor).recursive(first, files);

console.log(files);
