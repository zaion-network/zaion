import { existsSync, readFileSync } from "fs";
import { join } from "path";

export function getFileFromPath_v1(
  paths: string[],
  filename: string,
  isTs?: boolean,
  isApps?: boolean
) {
  if (isTs)
    return paths
      .map(path => join(path, filename))
      .map(path => [path, existsSync(path)])
      .filter(res => (res[1] ? true : false))
      .map(arr => arr[0])
      .map(path => {
        if (path && path !== true)
          return [path, readFileSync(path).toString()];
      })
      .map(string => {
        const regex =
          /(\/\/\**.*\*\/)|(?<=\s)\/\**.*\*\//g;
        let name: string;
        if (isApps)
          // TODO #182 @giacomogagliano trovare solution typescript
          // @ts-expect-error
          name = string[0]
            .replace(
              "/Users/WAW/Documents/Projects/ZION/apps/",
              ""
            )
            .replace("/tsconfig.json", "");
        if (!isApps) {
          // TODO trovare solution typescript
          // @ts-expect-error
          name = string[0]
            .replace(
              "/Users/WAW/Documents/Projects/ZION/packages/",
              ""
            )
            .replace("@zionstate/", "")
            .replace("@zionstate_node/", "")
            .replace("@zionstate_js/", "")
            .replace("/tsconfig.json", "");
        } else name = "";
        if (!string) throw new Error("");
        if (!string[1]) throw new Error("");
        return [
          name,
          JSON.parse(
            string[1].replace(regex, "").replace("\n", "")
          ),
        ];
      });
  if (!isTs)
    return paths
      .map(el => join(el, filename))
      .map(path => [path, existsSync(path)])
      .filter(res => {
        if (res[1]) return true;
      })
      .map(arr => arr[0])
      .map(path => {
        if (path && path !== true)
          return readFileSync(path).toString();
      })
      .map(string => {
        // const regex = /(\/\/\**.*\*\/)|(?<=\s)\/\**.*\*\//g;
        // if (regex.exec(string)) console.log(regex.exec(string));
        // string.replace(regex.exec(string)[0], "")
        if (!string) throw new Error("");
        return JSON.parse(string);
      });
}
