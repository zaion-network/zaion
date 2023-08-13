interface A extends A.A {}
class A {}
namespace A {
  export interface A {
    type: A.types;
    subtype: string;
    kind: string;
    subkind: string;
  }
  export enum types {
    b = "b",
    c = "c",
  }
}

interface Ab extends Ab.Ab {
  type: A.types.b;
  subtype: Ab.subtypes;
}
class Ab extends A implements Ab.Ab {}
namespace Ab {
  export interface Ab extends A {
    type: A.types.b;
    subtype: Ab.subtypes;
  }
  export enum subtypes {
    d = "d",
    e = "e",
  }
}

interface Abd extends Abd.Abd {
  subtype: Ab.subtypes.d;
}
class Abd extends Ab implements Abd.Abd {}
namespace Abd {
  export interface Abd extends Ab {
    subtype: Ab.subtypes.d;
  }
}

interface Abe extends Abe.Abe {
  subtype: Ab.subtypes.e;
  kind: Abe.kinds;
}
class Abe extends Ab implements Abe.Abe {}
namespace Abe {
  export interface Abe extends Ab {
    subtype: Ab.subtypes.e;
    kind: kinds;
  }
  export enum kinds {
    f = "f",
  }
}

interface Abef extends Abef.Abef {
  kind: Abe.kinds.f;
}
class Abef extends Abd implements Abef.Abef {}
namespace Abef {
  export interface Abef extends Abd {
    kind: Abe.kinds.f;
    subking: Abef.subkind;
  }
  export enum subkind {
    g = "g",
  }
}

interface Abefg extends Abefg.Abefg {
  subkind: Abef.subkind.g;
}
class Abefg extends Abef implements Abefg.Abefg {}
namespace Abefg {
  export interface Abefg extends Abef {
    subkind: Abef.subkind.g;
  }
}

namespace Ab {
  export interface Ab extends A {
    type: A.types.b;
  }
}
