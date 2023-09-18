// @ts-nocheck

export function edit_v3<T, Prop extends keyof T>(
  obj: T,
  nested: false,
  prop: [Prop, T[Prop]],
  nestedProp: never
): T;
export function edit_v3<
  T,
  C extends boolean,
  Prop extends keyof T,
  NestedProp extends keyof T[Prop]
>(
  obj: T,
  prop: C extends false ? [Prop, T[Prop]] : Prop,
  nestedProp?: C extends true
    ? [Prop, [keyof T[Prop], T[Prop][NestedProp]]]
    : never
): T {
  if ("charAr" in prop) obj[prop[0]] = prop[1];
  if ("shift" in prop && nestedProp)
    obj[prop[0]][nestedProp[1][0]] = nestedProp[1][1];
  return obj;
}

export type keys<T> = T extends [] ? keyof T : never;
export type keysOfObject<T> = T extends Object
  ? keyof T
  : never;
export type flatUnion<T> = T extends string ? T : false;
export type flatKeysOfObj<T> = flatUnion<keysOfObject<T>>;
export type ttt = flatUnion<keysOfObject<{ name: "" }>>;
export type get = flatKeysOfObj<[]>;

export function changPar(
  obj: { name: string },
  value: string
) {
  obj.name = value;
  return obj;
}
