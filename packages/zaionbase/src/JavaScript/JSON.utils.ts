import type { JavaScript } from "../JavaScript";
declare module "../JavaScript" {
  namespace JavaScript {
    interface JSON_utils {
      validateJson: typeof validateJson;
    }
    namespace JSON_utils {
      interface validateJson {
        <T>(target: string): Promise<T | false>;
      }
    }
  }
}

export const validateJson: JavaScript.JSON_utils.validateJson = target => {
  return new Promise(res => {
    try {
      let response = JSON.parse(target);
      res(response);
    } catch (error) {
      res(false);
    }
  });
};
