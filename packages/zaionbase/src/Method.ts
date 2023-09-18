declare module "./Method" {
  namespace Method {
    interface formatArgs {
      [k: string]: string;
    }
    interface MyMap<K, V> extends Map<K, V> {
      get(key: K): V;
    }
  }
}

export namespace Method {
  export abstract class Handler<T extends (...args: any[]) => any> {
    #strategy: T;
    constructor(strategy: T) {
      this.#strategy = strategy;
    }
    handle(...args: any[]) {
      return this.#strategy(...args);
    }
    setStrategy(newstrategy: T) {
      this.#strategy = newstrategy;
      return this;
    }
  }

  export abstract class Executor<T extends (...args: any[]) => any> {
    #handler: Handler<T>;
    #exer: T;
    get handler() {
      return this.#handler;
    }
    constructor(handler: Handler<T>, exer?: T) {
      this.#handler = handler;
      if (exer) this.#exer = exer;
      else this.#exer = handler.handle as T;
    }
    abstract execute: T;
  }

  export abstract class Method<K, H extends (...args: any[]) => any> {
    Executor: new (handler: Handler<H>) => Executor<H>;
    Handler: new (handler: H) => Handler<H>;
    executors: MyMap<keyof K, Executor<H>> = new Map();
    types: K;
    constructor(
      types: K,
      Executor: new (handler: Handler<H>) => Executor<H>,
      Handler: new (handler: H) => Handler<H>
    ) {
      this.Executor = Executor;
      this.Handler = Handler;
      this.types = types;
      this.setCommands();
    }
    process(type: keyof K, ...args: any[]) {
      let executor = this.executors.get(this.types[type] as keyof K);
      return executor.execute(...args);
    }
    setCommand(key: keyof K, value: Executor<H>) {
      this.executors.set(key, value);
      return this;
    }
    abstract setCommands(): void;
  }

  export namespace Class {
    export abstract class Class<T, M extends Method<any, any>> {
      methods: MyMap<T, M> = new Map();
      constructor() {
        this.setMethods();
      }
      setMethod(key: T, method: M) {
        this.methods.set(key, method);
      }
      abstract setMethods(): void;
    }
  }
}
