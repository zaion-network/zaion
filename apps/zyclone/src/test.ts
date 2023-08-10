export namespace Doit {
  export interface Doit<I extends string | number> {
    name: string;
    id: I;
  }
  export class Doit<I extends string | number> implements Doit<I> {
    constructor(public name: string) {}
  }

  export namespace DoitNumber {
    export interface DoitNumber extends Doit.Doit<number> {}
    export class DoitNumber extends Doit<number> implements DoitNumber {}
  }
  export namespace DoitString {
    export interface DoitString extends Doit.Doit<string> {}
    export class DoitString extends Doit<string> implements DoitString {}
  }
}
