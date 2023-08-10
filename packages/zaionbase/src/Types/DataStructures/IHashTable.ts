export interface IHashTable {
  set(key: any, value: any): any;
  get(key: any): any;
  remove(key: any): any;
  clear(key: any): any;
  entries(): IterableIterator<[any, any]>;
  forEach(
    callbackfn: (value: any, key: any, map: Map<any, any>) => void,
    thisArg?: any
  ): void;
  has(key: any): boolean;
  keys(): IterableIterator<any>;
  size: number;
  values(): IterableIterator<any>;
}
