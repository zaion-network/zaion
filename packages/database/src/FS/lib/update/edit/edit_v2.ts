export function edit_v2<T, Prop extends keyof T>(
  obj: T,
  prop: [Prop, T[Prop]]
): T {
  obj[prop[0]] = prop[1];
  return obj;
}

edit_v2({ name: "" }, ["name", ""]);
