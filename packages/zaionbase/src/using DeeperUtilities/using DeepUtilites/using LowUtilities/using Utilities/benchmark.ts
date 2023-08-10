export const benchmark: benchmark.benchmark = async (fn, args, options) => {
  if (!options) {
    const now = performance.now;
    const start = now();
    let result = await fn(args[0], args[1]);
    const stop = now();
    console.log(`elapsed: `, stop - start);
    return result;
  }
};
export namespace benchmark {
  export interface benchmark {
    (
      fn: (...args: any[]) => Promise<any>,
      args: any[],
      options?: {}
    ): Promise<any>;
  }
}
