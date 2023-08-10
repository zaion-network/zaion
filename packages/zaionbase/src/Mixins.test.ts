import { Mixins } from "./Mixins";
import { tester } from "./utils/tester";

tester(() => {
  class Some<V> {
    constructor(public value: V) {}
  }

  const Flyingable: _Flyingable = (ctor) =>
    class extends ctor {
      fly = () => console.log(`fly ${this.value.name}`);
    };

  const Chaseable: _Chaseable = (ctor) =>
    class extends ctor {
      chase = () => console.log(`${this.value.name} is chasing`);
    };

  const arr: [
    new (value: { name: string }) => Some<{ name: string }>,
    _Flyingable,
    _Chaseable
  ] = [Some<{ name: string }>, Flyingable, Chaseable];

  const reduce = Mixins.reduce;

  class Fly extends reduce(arr) {}

  const gly = new Fly({ name: "tony" });
  gly.fly();
  gly.chase();

  // type BaseCtor = Mixins.Ctor<
  //   [{ name: string }, boolean],
  //   { value: { name: string }; tony: number }
  // >;

  type Prebase = {
    value: { name: string };
  };
  type RequireByFlyingable = Mixins.Ctor<[{ name: string }], Prebase>;
  type flyingable = { fly: () => void };
  type _Flyingable = Mixins.mixin<flyingable, Prebase, RequireByFlyingable>;

  type Base = { value: { name: string } };
  type RequiredByChaseable = Mixins.Ctor<[{ name: string }], Base>;
  type chaseable = { chase: () => void };
  type _Chaseable = Mixins.mixin<chaseable, Base, RequiredByChaseable>;

  // type oo = Mixins.flattenMixing<
  //   new (value: { name: string }) => { value: { name: string } },
  //   _Flyingable
  // >;
  // type testit = Mixins.inferTuple<
  //   [
  //     new (value: { name: string }) => { value: { name: string } },
  //     _Flyingable,
  //     _Chaseable
  //   ]
  // >;
})(false);

tester(() => {
  // Create the interface for the class which will be mixed
  interface IGraphable {
    addNode: (node: string) => void;
  }

  // Call the ComplexMixin generic and generate the type
  type GraphableType = Mixins.mixin<IGraphable, FC, typeof FC>;

  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Graphable: GraphableType = (ctor) => {
    return class Graph extends ctor implements IGraphable {
      node: string[] = [];
      constructor(...args: any[]) {
        super();
        args[0] ? this.node.push(args[0]) : {};
      }
      addNode(node: string) {
        console.log("add node");
        this.node.push(node);
      }
    };
  };

  // Create the interface for the class which will be mixed
  interface INodable {
    child: any[];
    addChild: (child: any) => void;
  }

  // Call the ComplexMixin generic and generate the type
  type NodableType = Mixins.mixin<INodable, FC, typeof FC>;

  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Nodable: NodableType = (ctor) => {
    return class Duck extends ctor implements INodable {
      child: any[] = [];
      constructor(...args: any[]) {
        super();
        args[0] ? this.child.push(args[0]) : {};
      }
      addChild(child: any) {
        this.child.push(child);
      }
    };
  };

  // Make an interface or get the interface of the class which
  // shall be composed
  interface FC {
    x: number;
    y: number;
    componentDidMount: { name: string };
    render: number;
  }

  // In this example the class represents a React Component
  class FC {
    componentDidMount: { name: string };
    constructor(...args: any[]) {
      if (args[0]) this.componentDidMount = { name: args[0] };
      else this.componentDidMount = { name: "gigi" };
    }
    render = 0;
  }

  // Mix the classes in this way:
  const arr: [GraphableType, NodableType] = [Graphable, Nodable];
  class Abbb extends new Mixins.Mix(FC).with(arr) {
    ciao: string;
    constructor(ciao: string) {
      super();
      this.ciao = ciao;
      this.componentDidMount.name = "tony";
    }
  }

  const dodod = new Abbb("babbo");
  dodod.addChild;
  dodod.addNode("wopp");
  dodod.addChild(100);
  console.log(dodod);
})(false);

tester(() => {
  // Create the interface for the class which will be mixed
  interface IGraphable {
    addNode: () => void;
  }
  // Call the ComplexMixin generic and generate the type
  type GraphableType = Mixins.mixin<IGraphable, FC, typeof FC>;
  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Graphable: GraphableType = (ctor) => {
    return class Graph extends ctor implements IGraphable {
      node: string[] = [];
      constructor(...args: any[]) {
        super(...args);
        this.node.push(args[1]);
      }
      addNode() {
        console.log("add node");
      }
    };
  };
  // Create the interface for the class which will be mixed
  interface INodable {
    child: any[];
    addChild: (child: any) => void;
  }
  // Call the ComplexMixin generic and generate the type
  type NodableType = Mixins.mixin<INodable, FC, typeof FC>;
  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Nodable: NodableType = (ctor) => {
    return class Duck extends ctor implements INodable {
      child: any[] = [];
      constructor(...args: any[]) {
        super(...args);
        this.child.push(args[2]);
      }
      addChild(child: any) {
        this.child.push(child);
      }
    };
  };
  // Make an interface or get the interface of the class which
  // shall be composed
  interface FC {
    x: number;
    y: number;
  }
  // In this example the class represents a React Component
  class FC {
    componentDidMount: { name: string };
    constructor(...args: any[]) {
      if (args[0]) this.componentDidMount = { name: args[0] };
      else this.componentDidMount = { name: "gigi" };
    }
    render = 0;
  }
  // Mix the classes in this way:
  const arr: [
    Mixins.mixin<IGraphable, FC, typeof FC>,
    Mixins.mixin<INodable, FC, typeof FC>
  ] = [Graphable, Nodable];
  class Abbb extends new Mixins.Mix(FC).with(arr) {
    ciao = "";
    constructor(ciao: string) {
      super("babbbbb", "mamma", "figghi");
      this.ciao = ciao;
    }
  }
  const dodod = new Abbb("babbo");
  dodod.addChild;
  dodod.addNode();
  dodod.addChild(100);
  console.log(dodod);
})(false);

tester(() => {
  // Create the interface for the class which will be mixed
  interface IGraphable {
    addNode: (node: string) => void;
  }

  // Call the ComplexMixin generic and generate the type
  type GraphableType = Mixins.mixin<IGraphable, Boom, typeof Boom>;

  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Graphable: GraphableType = (ctor) => {
    return class Graph extends ctor implements IGraphable {
      node: string[] = [];
      constructor(...args: any[]) {
        super();
        args[0] ? this.node.push(args[0]) : {};
      }
      addNode(node: string) {
        console.log("add node");
        this.node.push(node);
      }
    };
  };

  // Create the interface for the class which will be mixed
  interface INodable {
    child: any[];
    addChild: (child: any) => void;
  }

  // Call the ComplexMixin generic and generate the type
  type NodableType = Mixins.mixin<INodable, Boom, typeof Boom>;

  // this is the actual Mixing class. The funciton shall be
  // called with a suffix `able` and the returned class shall
  // have the name of the class without the `able`
  const Nodable: NodableType = (ctor) => {
    return class Duck extends ctor implements INodable {
      child: any[] = [];
      constructor(...args: any[]) {
        super();
        args[0] ? this.child.push(args[0]) : {};
      }
      addChild(child: any) {
        this.child.push(child);
      }
    };
  };

  // Make an interface or get the interface of the class which
  // shall be composed
  interface FC<T> {
    x: number;
    y: number;
    componentDidMount: { name: string };
    render: T;
  }

  // In this example the class represents a React Component
  class FC<T> {
    componentDidMount: { name: string };
    constructor(...args: any[]) {
      if (args[0]) this.componentDidMount = { name: args[0] };
      else this.componentDidMount = { name: "gigi" };
    }
  }
  class Boom extends FC<string> {}
  // Mix the classes in this way:
  class Abbb extends new Mixins.Mix(Boom).with([Graphable, Nodable]) {
    ciao: string;
    constructor(ciao: string) {
      super();
      this.ciao = ciao;
      this.componentDidMount.name = "tony";
      this.render = "";
    }
  }

  const dodod = new Abbb("babbo");
  dodod.addChild;
  dodod.addNode("wopp");
  dodod.addChild(100);
  console.log(dodod);
})(false);

tester(() => {
  class Base {
    name: string;
    constructor(name: string,
      //  n: string
       ) {
      this.name = name;
    }
  }
  type Baseable = new (name: string, n: string) => { name: string };
  type Nable = new (n: string) => { n: string };
  type Cable = new (c: string) => { c: string };
  const Nable: Mixins.mixin<
    InstanceType<Nable>,
    InstanceType<Baseable>,
    Baseable
  > = (goo) => {
    return class N extends goo {
      n: string = "";
      constructor(name: string, n: string) {
        super(name, n);
        this.n = n;
      }
    };
  };
  const Cable: Mixins.mixin<
    InstanceType<Cable>,
    InstanceType<Baseable>,
    Baseable
  > = (goo) => {
    return class N extends goo {
      c: string = "";
      constructor(name: string, n: string) {
        super(name, n);
        this.c = n;
      }
    };
  };
  // class Boo extends Nable(Base) {
  //   b: number = 0;
  // }
  const arr: [
    Mixins.mixin<InstanceType<Nable>, InstanceType<Baseable>, Baseable>,
    Mixins.mixin<InstanceType<Cable>, InstanceType<Baseable>, Baseable>
  ] = [Nable, Cable];
  class Coo extends new Mixins.Mix(Base).with(arr) {
    b: number = 0;
  }
  // const bo = new Boo("name", "n");
  const bo = new Coo("name", "n");
  bo.n;
  bo.name;
  bo.b;
  bo.c;
  console.log(bo);
})(false);

tester(() => {
  type Base = new (...args: [string, string]) => { gnamgnam: boolean };
  // type UnknownBase = new () => {};
  type blast = boolean;

  type Oblast = new (blast: blast) => {
    blast: boolean;
    setBlast(blast: boolean): void;
  };
  type Oblastable = Mixins.mixin<
    InstanceType<Oblast>,
    InstanceType<Base>,
    Base
  >;

  type Onuke = new (nuke: boolean) => { nuke: boolean };
  type Onukeable = Mixins.mixin<InstanceType<Onuke>, InstanceType<Base>, Base>;
  type Obama = new (bama: string) => { bama: boolean };
  type Obamable = Mixins.mixin<InstanceType<Obama>, InstanceType<Base>, Base>;
  // type Osama = new (sama: boolean) => { sama: boolean };
  // type Osamable = Mixins.mixin<InstanceType<Osama>, InstanceType<Base>, Base>;

  // type Mixins2 = [Oblast, Onuke];
  type Mixins2M = [Oblastable, Onukeable, Obamable];
  // type Mixins2A = [Oblastable, Onukeable, Obamable, Osamable];
  // type Mixins3 = [Oblast, Onuke, Obama];

  const Oblastable: Oblastable = (ctor) => {
    return class extends ctor {
      blast: boolean = true;
      setBlast(blast: boolean) {
        this.blast = blast;
      }
    };
  };
  const Onukeable: Onukeable = (ctor) => {
    return class extends ctor {
      nuke: boolean = true;
    };
  };
  const Obamable: Obamable = (ctor) => {
    return class extends ctor {
      bama: boolean = true;
    };
  };
  const mixins: Mixins2M = [Oblastable, Onukeable, Obamable];
  const Base: Base = class {
    gnamgnam = true;
  };

  class Mixed extends new Mixins.Mix(Base).with(mixins) {
    ciao = 0;
    constructor(
      a0: string,
      // a1?: number,
      // a2?: string,
      // a3?: boolean,
      // a4?: boolean
    ) {
      super(a0, "asdasdas");
    }
  }
  const mixed = new Mixed("vi");
  // mixed.setBlast(false);
  console.log(mixed);
})(false);

tester(() => {
  const MixEvo = Mixins.Mix;

  type Oblastable = Mixins.mixin<
    {
      blast: boolean;
    },
    InstanceType<Base>,
    Base
  >;

  const Oblastable: Oblastable = (ctor) => {
    return class extends ctor {
      #blast: boolean = true;
      set blast(blast: boolean) {
        this.#blast = blast;
      }
      get blast() {
        return this.#blast;
      }
    };
  };

  type Onukeable = Mixins.mixin<
    {
      nuke: boolean;
      setNuke(blast: boolean): void;
    },
    InstanceType<Base>,
    Base
  >;
  const Onukeable: Onukeable = (ctor) => {
    return class extends ctor {
      nuke: boolean = true;
      setNuke(nuke: boolean) {
        this.nuke = nuke;
      }
    };
  };

  type Obamable = Mixins.mixin<{ bama: boolean }, InstanceType<Base>, Base>;
  const Obamable: Obamable = (ctor) => {
    return class extends ctor {
      // questo pattern rende invisibile il membro nel
      // console
      #bama: boolean = true;
      get bama() {
        return this.#bama;
      }
      static momba = 0;
    };
  };

  type Osamable = Mixins.mixin<{ sama: boolean }, InstanceType<Base>, Base>;
  const Osamable: Osamable = (ctor) => {
    return class extends ctor {
      sama = true;
    };
  };

  type Base = new () => { gnamgnam: boolean };
  const Base: Base = class {
    gnamgnam = true;
    static cli = "cli";
  };

  class Mixed extends new MixEvo(Base).with(
    Oblastable,
    Onukeable,
    Obamable,
    Osamable
  ) {
    ciao = 0;
    constructor() {
      super();
    }
    static member = "ciao";
  }
  const mixed = new Mixed();
  mixed.bama;
  mixed.blast = false;
  mixed.setNuke(true);

  // let obo = new MixEvo(Base).ctor;
  console.log(mixed);
  console.log(mixed.blast);
  console.log(mixed.nuke);
  console.log(mixed.setNuke);
  console.log(mixed.bama);
  console.log(mixed.sama);
  console.log(mixed.ciao);
  console.log(Mixed.member);
})(true);
