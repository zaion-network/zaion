export class JSONUtils {}
export namespace JSONUtils {
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
