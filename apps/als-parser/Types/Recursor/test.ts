import { Recursor, action, conditioner, recursor, runaction } from "./Recursor";

function random() {
  return Math.round(Math.random() * 10000000).toString(32);
}

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

const action: action<Some, string[]> = (target, result) =>
  result.push(target.name);

const conditioner: conditioner<Some> = (target) => target.isDirectory();

const runaction: runaction<typeof action> = (action) => (e) => action(e, files);

const recursor: recursor<typeof action> = (file, array) => (runaction) =>
  file.files!.forEach(runaction);

new Recursor(action, conditioner, runaction, recursor).performRecursion(
  first,
  files
);

console.log(files);

interface CharToNumber {
  (char: string): number;
}

const charToNumber: CharToNumber = (char) => {
  const numericValue = parseInt(char, 10);
  if (isNaN(numericValue)) {
    throw new Error(`Invalid character: ${char}`);
  }
  return numericValue;
};
