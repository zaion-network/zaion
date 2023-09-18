declare module "./GenericContext" {
  export namespace GenericContext {
    export interface GenericContext<V> {
      value: V;
    }
    export interface State<V> extends State.State<V> {}
    export namespace State {
      export type genericstate = true;
      export interface State<V> {
        value: V;
      }
    }
  }
}

export interface GenericContext<V> extends GenericContext.GenericContext<V> {}
export class GenericContext<V> implements GenericContext.GenericContext<V> {}
export namespace GenericContext {
  export class State<V> implements State.State<V> {}
}
