import { Context } from "../../Context";
import { ClassUtils } from "../../using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/JavaScript/ClassUtils";
import { tester } from "../../utils/tester";

tester("connection example", () => {
  enum connectionState {
    connected = "connected",
    notconnected = "notconnected",
  }
  interface ConnectionState
    extends Context.WithChangeValue.State<connectionState> {}
  class ConnectionState extends Context.WithChangeValue.State<connectionState> {
    constructor(
      value: connectionState,
      ctx: Context.WithChangeValue<connectionState>
    ) {
      super(value, ctx);
    }
  }
  class ConnectedState extends ConnectionState {
    constructor(ctx: Context.WithChangeValue<connectionState>) {
      super(connectionState.connected, ctx);
    }
  }
  class NotConnectedState extends ConnectionState {
    constructor(ctx: Context.WithChangeValue<connectionState>) {
      super(connectionState.notconnected, ctx);
    }
  }

  interface Connection extends Context.WithChangeValue<connectionState> {}
  class Connection extends Context.WithChangeValue<connectionState> {
    show() {
      console.log(this.value);
    }
  }

  class Application {
    constructor(public connection: Connection) {}
  }

  tester("run1", () => {
    const connection = new Connection();

    const application = new Application(connection);
    new ConnectedState(connection);
    console.log(connection);
    new NotConnectedState(connection);
    console.log(connection);
  })(true);

  tester("run2", () => {
    const isMetamask = () => false;
    const application = new Application(new Connection());
    let map = new Map<boolean, () => Connection>();
    map.set(
      false,
      () => new NotConnectedState(application.connection).ctx as Connection
    );
    map.set(
      true,
      () => new ConnectedState(application.connection).ctx as Connection
    );
    let res = map.get(isMetamask())!();
    let isMetamaskThere = new Map();
    isMetamaskThere.set(true, () => {});
    isMetamaskThere.set(false, () => {});
    res.show();
  });
})(true);

tester("isStringExample", () => {
  enum states {
    string = "string",
  }

  interface Status extends Context.WithChangeValue.State<states | undefined> {}
  class Status extends Context.WithChangeValue.State<states | undefined> {}
  class UndefinedStatus extends Context.WithChangeValue.State<undefined> {
    constructor(ctx: Context.WithChangeValue<any>) {
      super(undefined, ctx);
    }
  }
  class StringStatus extends Context.WithChangeValue.State<states> {
    constructor(ctx: Context.WithChangeValue<states>) {
      super(states.string, ctx);
    }
  }
  interface StatusCtx extends Context.WithChangeValue<states> {}
  class StatusCtx extends Context.WithChangeValue<states> {
    #state: Status | undefined;
    changeValue(
      state: Context.WithChangeValue.State<states>
    ): Context.WithChangeValue<states> {
      this.#state = state;
      return super.changeValue(state);
    }
    isString(): this is StringStatus {
      return this.#state instanceof StringStatus;
    }
  }
  const ctx = new StatusCtx();
  new UndefinedStatus(ctx);
  new StringStatus(ctx);
  console.log(ctx.isString());
});

tester("isReadyCleanExample", () => {
  enum status {
    ready = "ready",
    clean = "clean",
  }

  interface Status<V extends status> extends Context.WithChangeValue.State<V> {}
  class Status<V extends status> extends Context.WithChangeValue.State<V> {
    constructor(value: V, ctx: Software<V>) {
      super(value, ctx as Context.WithChangeValue<V>);
      this.ctx = ctx.changeState(this);
    }
  }

  interface ReadyStatus extends Status<status.ready> {}
  class ReadyStatus extends Status<status.ready> {
    constructor(context: Software<any>) {
      super(status.ready, context);
    }
  }

  interface CleanStatus extends Status<status.clean> {}
  class CleanStatus extends Status<status.clean> {
    constructor(context: Software<any>) {
      super(status.clean, context);
    }
  }

  interface Software<V extends status>
    extends Context.WithChangeValue<V | undefined> {
    isReady(): this is ReadySoftware;
    isClean(): this is CleanSoftware;
  }
  class Software<V>
    extends Context.WithChangeValue<V | undefined>
    implements Software<V>
  {
    #state: Status<any> | undefined;
    get state() {
      return this.#state;
    }
    constructor(value?: V) {
      super();
      if (value) this.value = value;
      else this.value = undefined;
    }
    changeValue(state: Status<any>): Software<any> {
      this.#state = state;
      return super.changeValue(state) as Software<any>;
    }
    isClean(): this is CleanSoftware {
      return this.#state instanceof CleanStatus;
    }
    isReady(): this is ReadySoftware {
      return this.#state instanceof ReadyStatus;
    }
    changeState(state: Status<V>): Context.WithChangeValue<any> {
      if (state instanceof CleanStatus) return new CleanSoftware();
      else return new ReadySoftware();
    }
  }

  interface CleanSoftware extends Software<status.clean> {
    restart(): void;
  }
  class CleanSoftware extends Software<status.clean> implements CleanSoftware {
    constructor() {
      super(status.clean);
    }
    restart(): void {
      console.log("restarted");
    }
  }

  interface ReadySoftware extends Software<status.ready> {}
  class ReadySoftware extends Software<status.ready> {
    constructor() {
      super(status.ready);
    }
  }
  const run1 = () => {
    const soft = new Software();
    const clean = new CleanStatus(soft);
    // const ready = new ReadyStatus(soft);

    console.log(clean.ctx);

    const actionOnCleanSoft = (soft: CleanSoftware) => {
      soft.restart();
    };

    interface defineCleanSoftware
      extends ClassUtils.defineSubClass<Software<any>, CleanSoftware> {}
    console.log(soft.isClean());

    const defineCleanSoftware: defineCleanSoftware = (s) => {
      if (s.isClean()) return s.state?.ctx as CleanSoftware;
      else throw new Error("");
    };
    actionOnCleanSoft(defineCleanSoftware(soft));
  };
  run1();
  const run2 = () => {
    enum ContextTypes {
      loaded = "loaded",
      empty = "empty",
    }
    type value = keyof typeof ContextTypes;

    interface Context2 extends Context.WithChangeValue<value> {
      value: value;
      changeValue(value: State): Context2;
    }
    class Context2 extends Context.WithChangeValue<value> implements Context2 {
      #state: State | undefined;
      constructor(value?: value) {
        super();
        if (value) this.#setAsValue(value);
        else this.#setLoaded();
      }
      #setAsValue = (value: value) => {
        this.value = value;
        if (!this.#state) this.#state = { value: undefined } as any as State;
        this.#state!.value = value;
      };
      #setLoaded = () => {
        this.value = ContextTypes.loaded;
        // this.#state!.value = ContextTypes.loaded;
      };
      changeValue(state: State): Context2 {
        super.changeValue(state);
        if (this.value === ContextTypes.empty)
          return new EmptyContext(this.value);
        else return new LoadedContext(this.value);
      }
      isEmpty(): this is EmptyContext {
        return this instanceof EmptyContext;
      }
      isLoaded(): this is LoadedContext {
        return this instanceof LoadedContext;
      }
    }

    class LoadedContext extends Context2 {
      play(): void {
        console.log("playing");
      }
    }
    class EmptyContext extends Context2 {
      load(): void {
        console.log("loading");
      }
    }

    interface State extends Context.WithChangeValue.State<value> {}
    class State extends Context.WithChangeValue.State<value> implements State {
      constructor(value: value, public context: Context2) {
        super(value, context);
        this.value = value;
        this.context = context.changeValue(this);
      }
      ensureEmpty() {
        return State.ensureEmptyCtx(this.context);
      }
      ensureLoaded() {
        return State.ensureLoadedCtx(this.context);
      }
      static ensureEmptyCtx: (ctx: Context2) => EmptyContext = (ctx) => {
        return ctx as EmptyContext;
      };
      static ensureLoadedCtx: (ctx: Context2) => LoadedContext = (ctx) => {
        return ctx as LoadedContext;
      };
    }
    class LoadedState extends State {
      constructor(ctx: Context2) {
        super(ContextTypes.loaded, ctx);
      }
    }
    class EmptyState extends State {
      constructor(ctx: Context2) {
        super(ContextTypes.empty, ctx);
      }
    }

    const run = () => {
      const ctx = new Context2();
      console.log(ctx);
      new EmptyState(ctx).ensureEmpty().load();
      console.log(ctx);
      new LoadedState(ctx).ensureLoaded().play();
      console.log(ctx);
    };
    run();
  };
  // run2();
});

tester("configExample", () => {
  enum configstates {
    hasPath = "hasPath",
    hasNoPath = "hasNoPath",
  }
  interface ConfigState extends Context.WithChangeValue.State<configstates> {}
  class ConfigState extends Context.WithChangeValue.State<configstates> {
    constructor(
      value: configstates,
      ctx: Context.WithChangeValue<configstates>
    ) {
      super(value, ctx);
    }
  }
  class HasPathConfigState extends ConfigState {
    constructor(ctx: Context.WithChangeValue<configstates>) {
      super(configstates.hasPath, ctx);
    }
  }
  class HasNoPathConfigState extends ConfigState {
    constructor(ctx: Context.WithChangeValue<configstates>) {
      super(configstates.hasNoPath, ctx);
    }
  }

  interface Contesto extends Context.WithChangeValue<configstates> {}
  class Contesto extends Context.WithChangeValue<configstates> {}
  const run1 = () => {
    const contesto = new Contesto();
    new HasNoPathConfigState(contesto);
    new HasPathConfigState(contesto);
    console.log(contesto);
  };
  run1();
});
