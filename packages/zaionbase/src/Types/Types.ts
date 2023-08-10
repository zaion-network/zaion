declare module "./Types" {
  type reverse = boolean;

  namespace Types {
    type flatarr<T> = T extends Array<infer X>
      ? T[0] extends infer Y
        ? Y
        : false
      : false;

    /**
     * util type which lets flatten types which are incapsulated
     * inside other types.
     */
    type Flatten<T> = T extends any[] ? T[number] : T;

    /**
     * util type which flattens arrays
     */
    type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;

    type TupleUnion<U extends string, R extends any[] = []> = {
      [S in U]: Exclude<U, S> extends never
        ? [...R, S]
        : TupleUnion<Exclude<U, S>, [...R, S]>;
    }[U];

    /**
     * Usage
     * ```
     * const arr2 = [{ a: 0 }, { b: true }, { c: { d: 0 } }]
     *
     * type InterOfArr = IntersctionOfObjectInArray<typeof arr2>
     * ```
     * expexcted output:
     * ```
     * type InterOfArr = {
     *     a?: number | undefined;
     *     b?: boolean | undefined;
     *     c?: {
     *         d: number;
     *     } | undefined;
     * }
     * ```
     */
    type IntersectionOfObjectInArray<T> = T extends Array<any>
      ? T extends Object
        ? { [Prop in keyof T[number]]: T[number][Prop] }
        : never
      : never;

    /**
     * This utility type takes optional fields and makes at
     * least one of them required in the resulting type.
     *
     * Usage:
     * ```js
     * type test = RequireOnlyOne<
     *  { id?: string; name?: string },
     *  "id" | "name"
     * >;
     * const obj:test ={id:''} // ts complains until at least one of the field is used
     * ```
     */
    type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
      T,
      Exclude<keyof T, Keys>
    > &
      {
        [K in Keys]-?: Required<Pick<T, K>> &
          Partial<Record<Exclude<Keys, K>, undefined>>;
      }[Keys];

    namespace flatteners {
      /**
       * Example
       * ```
       * interface IdLabel {
       *   id: number ;
       *   bloo: boolean;
       * }
       *
       * type IdLabelType = FlattenInterface<IdLabel>;
       * ```
       * expected output:
       * ```
       * type IdLabelType = {
       *     id: number;
       *     bloo: boolean;
       * }
       * ```
       */
      type FlattenInterface<Type> = {
        [Property in keyof Type]: Type[Property];
      };

      type InterfaceOfClass<T> = FlattenInterface<
        InstanceType<T extends Class.Constructor ? T : never>
      >;

      // this types were using a deprecated version of mixin

      // export type InterfaceOfMixin<T> = FlattenInterface<
      //   InstanceType<ReturnType<T extends Mixin ? T : never>>
      // >;

      // export type InterfaceOfBoth<MixinType, Superclass> = InterfaceOfMixin<
      //   MixinType extends Mixin ? MixinType : never
      // > &
      //   InterfaceOfClass<
      //     Superclass extends ZionTypes.Class.Constructor ? Superclass : never
      //   >;

      // export type ConstrOfInterfaceOfBoth<MixinType, Superclass> =
      //   ZionTypes.Class.GCtor<
      //     InterfaceOfBoth<
      //       MixinType extends Mixin ? MixinType : never,
      //       Superclass extends ZionTypes.Class.Constructor ? Superclass : never
      //     >
      //   >;
    }

    namespace extenders {
      /**
       * Checks if a value is a function.
       *
       * @template T - The value to check.
       * @returns `true` if `T` is a function, otherwise `false`.
       *
       * @example
       * const func = () => {
       *   console.log("Hello!");
       * };
       *
       * const isFunc = isFunction<typeof func>; // true
       *
       * const obj = { name: "John" };
       *
       * const isObjFunc = isFunction<typeof obj>; // false
       */
      type isFunction<T> = T extends object
        ? T extends Function
          ? true
          : false
        : false;

      /**
       * Checks if a class extends a specific constructor type.
       *
       * @template C - The constructor type to check against.
       * @template T - The class to check.
       * @returns `true` if `T` extends `C`, otherwise `false`.
       *
       * @example
       * type MyConstructor = new () => { name: string };
       *
       * class MyClass {
       *   name: string;
       *   constructor() {
       *     this.name = "John";
       *   }
       * }
       *
       * class SomeOtherClass {
       *   age: number;
       *   constructor() {
       *     this.age = 30;
       *   }
       * }
       *
       * const isDerived = isAeqB<MyConstructor, typeof MyClass>; // true
       * const isNotDerived = isAeqB<MyConstructor, typeof SomeOtherClass>; // false
       */
      type isAeqB<A, B, R extends reverse = false> = R extends false
        ? A extends B
          ? true
          : false
        : B extends A
        ? true
        : false;
    }

    namespace Record {
      /**
       */
      /**
       * Represents a generic record type with keys of type `K` and values of type `V`.
       *
       * @template V - The value type of the record.
       * @template K - The key type of the record. Defaults to `string`.
       * @returns An object type with keys of type `K` and values of type `V`.
       *
       * ```
       * // this generates a strict requirement
       * type MyRecord = GenericRecord<{ name: number },"value">;
       * // this generates a losey requirement
       * type MyRecord2 = GenericRecord<{ name: number }>;
       * type ou = { value: { name: number } };
       * type oo = { value: { name: number }; s: number };
       * type oi = { value: { namd: number }; valu: { name: number } };
       * type test1 = ou extends MyRecord ? true : false;      // true
       * type test1a = ou extends MyRecord2 ? true : false;    // true
       * type test2 = oo extends MyRecord ? true : false;      // true
       * type test2a = oo extends MyRecord2 ? true : false;    // false
       * type test3 = oi extends MyRecord ? true : false;      // false
       * type test3a = oi extends MyRecord2 ? true : false;    // false
       * ```
       */
      type GenericRecord<V, K extends string = string> = { [k in K]: V };

      /**
       * Combines two types `T` and `U` to create a type that only includes properties present in `T`
       * and does not allow additional properties from `U`.
       *
       * @template T - The base type.
       * @template U - The type to compare against.
       * @returns A type that is an exact match of `T`.
       *
       * @example
       * // Defining a base type
       * type Person = {
       *   name: string;
       *   age: number;
       * };
       *
       * // Defining a detailed type with an additional property
       * type DetailedPerson = {
       *   name: string;
       *   age: number;
       *   address: string;
       * };
       *
       * // Creating an exact type based on `Person`
       * type ExactPerson = Exact<Person, DetailedPerson>;
       *
       * // Valid assignment
       * const person: ExactPerson = {
       *   name: "John",
       *   age: 30,
       * };
       *
       * // Error: Additional property 'address' is not allowed
       * const invalidPerson: ExactPerson = {
       *   name: "Jane",
       *   age: 25,
       *   address: "123 Elm St",
       * };
       */
      type Exact<T, U> = T & Record<Exclude<keyof U, keyof T>, never>;

      /**
       * Recursively removes optionality from all properties of a type `T`.
       * If `T` is not an object type, it returns `T` as is.
       *
       * @template T - The type to make strict.
       * @returns A type with all properties of `T` made non-optional.
       *
       * @example
       * // Defining a type with optional properties
       * type Person = {
       *   name?: string;
       *   age?: number;
       *   address?: string;
       * };
       *
       * // Creating a strict type based on `Person`
       * type StrictPerson = Strict<Person>;
       *
       * // Valid assignment with all properties required
       * const person: StrictPerson = {
       *   name: "John",
       *   age: 30,
       *   address: "123 Main St",
       * };
       *
       * // Error: Missing required property 'address'
       * const invalidPerson: StrictPerson = {
       *   name: "Jane",
       *   age: 25,
       * };
       */
      type Strict<T> = T extends object
        ? { [K in keyof T]-?: Strict<T[K]> }
        : T;
    }

    namespace Class {
      /**
       *
       * example
       * ```
       * interface Person {
       *   name: string;
       *   age: number;
       *   location: string;
       * } *
       * type LazyPerson = Getters<Person>;
       * ```
       * expected output:
       * ```
       * type LazyPerson = {
       *     getName: () => string;
       *     getAge: () => number;
       *     getLocation: () => string;
       * }
       * ```
       */
      type Getters<Type> = {
        [Property in keyof Type as `get${Capitalize<
          string & Property
        >}`]: () => Type[Property];
      };

      type Constructor1<T> = new () => T;
      /**
       * Basic constructor which instance is an empty object
       */
      type Constructor = new (...args: any[]) => {};
      /**
       * Allows creation of classe which only work with costrained
       * classe.
       *
       * Usage
       * ```
       * type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
       * type Spritable = GConstructor<Sprite>;
       * type Loggable = GConstructor<{ print: () => void }>;
       * function Jumpable<TBase extends Positionable>(Base: TBase) {
       *   return class Jumpable extends Base {
       *     jump() {
       *       // This mixin will only work if it is passed a base
       *       // class which has setPos defined because of the
       *       // Positionable constraint.
       *       this.setPos(0, 20);
       *     }
       *   };
       * }
       * ```
       */
      type GCtor<T> = new (...args: any[]) => T;
      type GCtor2<T> = new (...args: any[]) => T extends Object ? T : never;
      type GCtor3<A, O> = new (args: A) => O;

      /**
       * Questo type dovrebbe poter dare la possibilità di creare
       * una classe usando un Type generico e definendone i
       * dettagli al momento della dichiarazione
       * Usage:
       * ```ts
       * const Blooo: ClassType<{ a: string, b:string, c:number },string|number> = class NewClass {
       *  a: string = "";
       *  b: string = '';
       *  c: number = 0
       *  constructor(a: string,c:number) {
       *    this.a = a;
       *    this.c = c
       *  }
       * };
       * ```
       */
      type GClassType<X, T = number> = new (
        ...args: (T extends ConstructorParameters<infer Params>
          ? Params extends string | number
            ? Params
            : never
          : T)[]
      ) => X extends infer Type ? Type : never;

      abstract class Strategy {
        abstract name: string;
        abstract method(...args: unknown[]): unknown;
      }

      /**
       * Generic type constructor. It accepts only one type
       * parameters which describe the interface of the returned
       * instance.
       */
      type GConstructor<T> = new (...arg: any[]) => T;

      /**
       * Generic type constructor. It accepts only one type
       * parameters which describe the interface of the returned
       * instance.
       */
      type GAbstractConstructor<T> = abstract new (...arg: any[]) => T;

      /**
       * Type which can describe any class. It can be used as type
       * for inputs which expect a constructor.
       */
      type AnyCtor_v1 = new (...args: any[]) => any;

      /**
       * Type which can describe any class. It can be used as type
       * for inputs which expect a constructor.
       */
      type AnyAbstractCtor_v1 = abstract new (...args: any[]) => any;

      /**
       * Type which can take 2 arguments to describe a constructor
       * @param T Type of the arguments as array of union
       * @param R Type which defines the return of the class which
       * usually is represented by an interface.
       */
      type NCtor<T, R> = new (...args: T[]) => R;

      /**
       * Utility type which retrieves the type of the instance of
       * a given class
       */
      type InferInstance<t extends new (...args: any) => any> =
        InstanceType<t> extends {}
          ? {
              [k in keyof InstanceType<t>]: InstanceType<t>[k];
            }
          : never;

      /**
       * Utility type which retrieves the type of the instance of
       * a given abstract class
       */
      type InferAbstractInstance<t extends abstract new (...args: any) => any> =
        InstanceType<t> extends {}
          ? {
              [k in keyof InstanceType<t>]: InstanceType<t>[k];
            }
          : never;
    }

    namespace Middlewares {
      type Middleware<T> = (curr: T) => void;
    }

    namespace UnionStuff {
      type UnionToIntersection<U> = (
        U extends any ? (k: U) => void : never
      ) extends (k: infer I) => void
        ? I
        : never;

      type UnionToOvlds<U> = UnionToIntersection<
        U extends any ? (f: U) => void : never
      >;

      type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void
        ? A
        : never;

      type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

      type UnionToTuple<T, A extends unknown[] = []> = IsUnion<T> extends true
        ? UnionToTuple<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
        : [T, ...A];
    }

    namespace ZionTypes {
      namespace Zion {
        type StateDepartments =
          | "learn"
          | "design"
          | "build"
          | "communication"
          | "trade";
        type Tokens = "ERC721" | "ERC1155" | "ERC20" | "zNFT";
        type Unique721 = "copyright" | "intellectual-properties";
        type Licences = "commercial" | "private";
        type ArtDomain = "music" | "visual" | "cooking";
        type Domain = "physical" | "digital";
        type MusicPhysicalSupport =
          | "vinyl"
          | "cd"
          | "cassette"
          | "mini-disk"
          | "ADAT";
        type VinylFormats = "12'" | "9'" | "7'";
        type Product = "pfp" | "album" | "single";
        type ContractTypes = "profile" | "product" | "service" | "equipment";
        type ProjectDepartments =
          | "research"
          | "development"
          | "production"
          | "marketing"
          | "distribution"
          | "care";
        type CreatorTypes =
          | "artist"
          | "studio"
          | "label"
          | "collective"
          | "promoter"
          | "project"
          | "company"
          | "supplier"
          | "distributor"
          | "sound-system";
        type ServiceTypes = "tutoring" | "performance" | "coding";
        type PerformanceTypes = "concert" | "tour";
        type PerformanceVenues =
          | "club"
          | "hangar"
          | "warehouse"
          | "concert-hall";
        type VideoStraminServices = "youtube" | "twitch";
        type zNftFeatures = "share" | "governance";
        type MarketSaleType = "OrderBook" | "AMM" | "BondingCurve" | "OTC";
        type MintTokenShopTypes = "Whitelist" | "Invitation";
        // find a way to list the type of selection of the pre order
        type PremintingTypes = "Casual" | "Manual";
        type MintingType = "pre-minted" | "on-the-fly";
        type GovernanceTypes = "Moloko" | "Governor";
        type ProductVisualization = `${Product}_${Visualization}`;
        type ProductVisualizationOfTokens = `${ProductVisualization}_${Tokens}`;

        type Visualization = "card" | "page" | "popup";

        enum zNFTBagdes {
          user = "user",
          creator = "creator",
          project = "project",
          product = "product",
          launchpad = "launchpad",
          label = "label",
          brand = "brand",
          developer = "developer",
          musicGig = "musicGig",
          studio = "studio",
          soundService = "sound service",
          soundSystem = "sound system",
          club = "club",
          singer = "singer",
          instrmentalist = "instrumentalist",
          soundEngineer = "sound engineer",
          producer = "producer",
          manager = "manager",
          dj = "dj",
          liveAct = "live act",
          livePerformer = "live performer",
          recodingArtist = "recording artist",
          songWriter = "song writer",
          beatMaker = "beat maker",
          author = "author",
          composer = "composer",
          soundDesigner = "sound designer", // meglio fare sound designer, o mettere un campo designer e mettere i vari tipi
          visualArtist = "visual artist",
          _2dDesigner = "2d designer",
          _3dDesigner = "3d designer",
          sofDev = "software developer",
          sofDes = "software designer",
          tutor = "tutor",
          streamer = "streamer",
          preformer = "performer",
          comCourier = "community courier",
          commTextSup = "community textile supplier",
          commPrinSup = "community print supplier",
          commVinylSup = "community vinyl press plant",
          gamer = "gamer",
          activist = "activist",
          recorderMusic = "recorded music",
          textileManif = "textile manifacturer",
          printHouse = "printHouse",
          pressingPlant = "pressingPlant",
          courier = "courier",
          stockNode = "stock node",
          homeNode = "home node",
          clubNode = "club node",
          studioNode = "studio node",
          soundSystemNode = "sound system node",
          fullStackNode = "full stack node",
          promoter = "promoter",
          bookingAgent = "booking agent",
          bookingAgenct = "booking agency",
          tastManager = "task manager",
          serviceProvider = "service provide",
          DAO = "DAO",
          zProducer = "zNFT Producer",
          artist = "artist",
          curator = "curator",
          startup = "start-up",
        }
      }
    }
  }
}

export class Types {}
export namespace Types {
  export type BooleanKeys<
    Keys extends string,
    makeRequired extends boolean = false
  > = makeRequired extends false
    ? {
        [key in Keys]?: boolean;
      }
    : {
        [key in Keys]: boolean;
      };

  export type UnionToIntersection<U> = (
    U extends any
      ? // if extends any
        (k: U) => void
      : // if it doesnt extend any
        never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type flatten<T> = T extends infer X ? { [k in keyof X]: X[k] } : never;
}

const arr = [0, ""];
type res = Types.flatarr<typeof arr>;

type oo = Types.extenders.isAeqB<
  new (name: string) => { name: string; tony: string },
  new (name: string, ...args: any[]) => {
    name: string;
    surname?: string;
    [k: string]: any;
  }
>;
