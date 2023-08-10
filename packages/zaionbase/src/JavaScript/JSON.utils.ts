export class JSON_utils {}
export namespace JSON_utils {
  export interface validateJson {
    <T>(target: string): Promise<T | false>;
  }
  export const validateJson: validateJson = (target) => {
    return new Promise((res) => {
      try {
        let response = JSON.parse(target);
        res(response);
      } catch (error) {
        res(false);
      }
    });
  };
}
