import { Global_utils as GU } from "./JavaScript/Global.utils";
import { JSON_utils as JU } from "./JavaScript/JSON.utils";

export class JavaScript {}
export namespace JavaScript {
  export class Global_utils extends GU {}

  export class JSON_utils extends JU {}
  export namespace JSON_utils {}

  export namespace ArrayBufferUtils {}
  export namespace AsyncFunction_utils {}
  export namespace AsyncGenerator_utils {}
  export namespace AsyncGeneratorFunction_utils {}
  export namespace AsyncIterator_utils {}
  export namespace DataView_utils {}
  export namespace Date_utils {}
  export namespace Error_utils {}
  export namespace Function_utils {}
  export namespace Generator_utils {}
  export namespace GeneratorFunction_utils {}
  export namespace Math_utils {}
  export namespace Proxy_utils {}
  export namespace RegExpUtils_utils {}
  export namespace Buffer_utils {}

  export namespace Global_utils {
    export namespace setTimeout_utils {}
    export namespace setInterval_utils {}
  }

  export namespace WebApisUtils {
    export namespace ServiceWorker_API {}
    export namespace Canvas_API {}
    export namespace CookieStore_API {}
    export namespace DOM_API {}
    export namespace Fetch_API {}
    export namespace PointerEvents_API {}
    export namespace TouchEvents_API {}
    export namespace UIEvents_API {}
    export namespace File_API {}
    export namespace FileSystem_API {}
    export namespace HTMLDOM_API {}
    export namespace HTMLDragNDrop_API {}
    export namespace HTMLSanitizer_API {}
    export namespace History_API {}
    export namespace IntersectionObserver_API {}
    export namespace Keyboard_API {}
    export namespace GeoLocation_API {}
    export namespace URL_API {}
    export namespace WebCrypto_API {}
    export namespace Websockets_API {}
    export namespace WebStorage_API {}
    export namespace WebWorker_API {}
  }
}

JavaScript.Global_utils.setInterval_utils.Interval;
