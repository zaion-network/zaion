import { MethodWithStrategies } from "../MethodWithStrategy";

export interface MapFromJson
  extends MethodWithStrategies<
    typeof MapFromJson.parseMapFromJsonStrategies,
    MapFromJson.strategies
  > {}
export class MapFromJson<
  S extends MapFromJson.strategiesKeys = MapFromJson.strategiesKeys
> extends MethodWithStrategies<
  typeof MapFromJson.parseMapFromJsonStrategies,
  MapFromJson.strategies
> {
  constructor(selectedStrategy: S) {
    super(
      MapFromJson.parseMapFromJsonStrategies,
      { parse: MapFromJson.parse, reduce: MapFromJson.reduce },
      selectedStrategy
    );
  }
}
export namespace MapFromJson {
  export enum parseMapFromJsonStrategies {
    reduce = "reduce",
    parse = "parse",
  }
  export type strategiesKeys = keyof typeof parseMapFromJsonStrategies;

  export interface parseMapFromJson {
    (json: string): Map<unknown, unknown>;
  }
  export interface strategies {
    parse: parseMapFromJson;
    reduce: parseMapFromJson;
  }

  export const parse: parseMapFromJson = json => {
    return new Map(JSON.parse(json));
  };
  export const reduce: parseMapFromJson = json => {
    let parsed = JSON.parse(json) as [unknown, unknown][];
    return new Map(
      parsed.reduce((acc, [key, value]) => {
        acc.set(key, value);
        return acc;
      }, new Map<unknown, unknown>())
    );
  };
  export const parseMapFromJson: parseMapFromJson = new MapFromJson("parse")
    .execute;
}
