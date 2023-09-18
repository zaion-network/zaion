import "../../../../../../JavaScript";
declare module "../../../../../../JavaScript" {
  namespace JavaScript {
    interface Promise_utils {
      wait: wait.wait;
    }
    namespace Promise_utils {}
  }
}

declare module "./Promise_Utils" {
  namespace wait {
    interface wait {
      (amount: number): Promise<unknown>;
    }
  }
}

export class Promise_utils {}
export namespace Promise_utils {
  export const wait: wait.wait = amount => {
    return new Promise(res => {
      setTimeout(() => res(true), amount);
    });
  };
}

export const wait: wait.wait = amount => {
  return new Promise(res => {
    setTimeout(() => res(true), amount);
  });
};
