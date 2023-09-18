export type objectInPackJson = { [key: string]: string };

type objectType = {
  name: string;
  dependencies: objectInPackJson;
};
export function mapObject_v1(
  obj: objectType[],
  field:
    | "dependencies"
    | "devDependencies"
    | "peerDependencies"
    | "scripts",
  options: { perPack: true }
): [
  string,
  {
    build?: string;
    clean?: string;
    dev?: string;
    prod?: string;
    typecheck?: string;
  }
][];
export function mapObject_v1(
  obj: objectType[],
  field:
    | "dependencies"
    | "devDependencies"
    | "peerDependencies"
    | "scripts",
  options?: { perPack: boolean }
): [string, string][];
export function mapObject_v1(
  obj: objectType[],
  field:
    | "dependencies"
    | "devDependencies"
    | "peerDependencies"
    | "scripts",
  options?: { perPack: boolean }
) {
  if (!options)
    return (
      obj
        // TODO #183 @giacomogagliano trovare solution typescript
        // @ts-expect-error
        .map(json => json[field])
        .map(obj => {
          let array: [string, string][] = [];
          for (let key in obj) array.push([key, obj[key]]);
          return array;
        })
        .flat()
    );
  if (options.perPack) {
    // TODO trovare solution typescript
    // @ts-expect-error
    return obj.map(json => [json.name, json[field]]);
  }
}
