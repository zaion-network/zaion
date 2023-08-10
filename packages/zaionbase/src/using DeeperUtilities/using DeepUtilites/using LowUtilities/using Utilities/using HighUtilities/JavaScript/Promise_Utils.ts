export class Promise_utils {}
export namespace Promise_utils {
  export const wait: wait.wait = (amount) => {
    return new Promise((res) => {
      setTimeout(() => res(true), amount);
    });
  };
  export namespace wait {
    export interface wait {
      (amount: number): Promise<unknown>;
    }
  }
}
