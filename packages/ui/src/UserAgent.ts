declare module "./UserAgent" {
  type useragent = string;
  type device = string;
  type operatingSystem = string;
  type webKitVersion = string;
  type layoutEngine = string;
  type browser_browserVersion = string;
  interface iUserAgentInfo {
    userAgent: string;
    device: string;
    operatingSystem: string;
    webKitVersion: string;
    layoutEngine: string;
    browser: string;
    browserVersion: string;
  }
  namespace UserAgent {
    interface Test {
      a: string;
    }
    interface UserAgentInfo {
      value: iUserAgentInfo;
    }
  }
}
export namespace UserAgent {
  export class UserAgentInfo implements UserAgent.UserAgentInfo {
    #userAgent: string;
    value: iUserAgentInfo;
    constructor(window: Window) {
      this.#userAgent = window.navigator.userAgent;
      this.value = this.#makeUserAgentInfos(this.#userAgent);
    }
    get isMobile() {
      return UserAgent.isMobile(this.#userAgent);
    }
    #parseUserAgent(userAgent: string): any {
      return userAgent
        .split("(")
        .map(e => e.trim())
        .map(e => e.split(")"))
        .flat()
        .map(e => e.trim())
        .map(e => e.split(";"))
        .flat()
        .map(e => e.trim());
    }
    #makeUserAgentInfos(userAgent: string): iUserAgentInfo {
      const arr: [
        useragent,
        device,
        operatingSystem,
        webKitVersion,
        layoutEngine,
        browser_browserVersion
      ] = this.#parseUserAgent(userAgent);
      const obj: iUserAgentInfo = {
        userAgent: arr[0],
        device: arr[1],
        operatingSystem: arr[2],
        webKitVersion: arr[3],
        layoutEngine: arr[4],
        browser: arr[5].split("/")[0]!,
        browserVersion: arr[5].split("/")[1]!,
      };
      return obj;
    }
  }
  export const isMobile = (userAgent: string) =>
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(userAgent);
}
