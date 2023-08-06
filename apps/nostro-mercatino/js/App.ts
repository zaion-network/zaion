import { requestProvider } from "../node_modules/webln/lib/client";
import { WebLNProvider } from "../node_modules/webln/lib/provider";
import type { UIDesign } from "./Dom";

declare module "App" {
  interface GenericCallback<T, E, R> {
    (this: T, ev: E): R;
  }
  interface Callback<T extends Array<any>> {
    (...args: T): void;
  }
  interface EventHandler
    extends Callback<[App, Event | undefined]> {}
  interface EmitHandler
    extends Callback<[App, undefined | MediaQueryListEvent]> {}
  interface iWindow extends Window {
    WebLN?: { requestProvider: typeof requestProvider };
  }
  interface OpenHandler
    extends GenericCallback<WebSocket, Event, any> {}
  interface ErrorHandler
    extends GenericCallback<WebSocket, Event, any> {}
  interface CloseHandler
    extends GenericCallback<WebSocket, CloseEvent, any> {}
  interface MessageHandler
    extends GenericCallback<WebSocket, MessageEvent<any>, any> {}
}
export interface iApp {
  window: Window;
  userAgent: App.UserAgent.UserAgentInfo;
  theme: "light" | "dark" | "no-preference";
  isWebln: boolean;
  webln: WebLNProvider;
  isMinWIth768: boolean;
  nodeslist: UIDesign[];
}
export class App implements App {
  constructor(public value: iApp) {
    const mkcb = this.makeEmitCb;
    const mkecb = this.makeEmitEventCb;
    this.value.userAgent = new App.UserAgent.UserAgentInfo(
      this.value.window
    );
    this.value.isWebln = App.WebLN.isWebLN(this.value.window);
    this.value.window.addEventListener("load", mkecb("load"));
    this.value.window.addEventListener(
      "DOMContentLoaded",
      mkcb("dom")
    );
    this.themeQuery.addEventListener(
      "change",
      mkecb("themeChange")
    );
    this.orientationQuery.addEventListener(
      "change",
      mkcb("orientationChange")
    );
    this.value.isMinWIth768 = this.minWidth768Query.matches;
    this.minWidth768Query.addEventListener(
      "change",
      mkcb("minWidth768Change")
    );
  }
  get themeQuery(): MediaQueryList {
    return App.getThemeQuery(this.value.window);
  }
  get orientationQuery(): MediaQueryList {
    return App.getOrientation(this.value.window);
  }
  get minWidth768Query(): MediaQueryList {
    return App.getMinWith768(this.value.window);
  }
  makeEmitCb =
    (type: keyof typeof App.events) =>
    (data: MediaQueryListEvent | Event) =>
      this.emit(type, data);
  makeEmitEventCb =
    (type: keyof typeof App.events) =>
    (data: MediaQueryListEvent | Event) =>
      this.emit(type, data);
  requestProvider = async () => {
    this.emit("requestedProvider");
    try {
      setTimeout(async () => {
        (globalThis as any).that = (
          window as iWindow
        ).WebLN!.requestProvider;
        this.value.webln = await (
          window as iWindow
        ).WebLN!.requestProvider();
        this.emit("got-provider");
      }, 100);
    } catch (error) {
      console.log("passed here too");
      this.emit("no-provider");
    }
  };
  checkNostr = () => {
    if ((window as any).nostr) {
      this.emit("nostr", (window as any).nostr);
    } else {
      console.log("nostr not found");
    }
  };
  #subscribers = new Map<keyof typeof App.events, EmitHandler[]>();
  #eventSubs = new Map<keyof typeof App.events, EventHandler[]>();
  emit(
    type: keyof typeof App.events,
    data: undefined | MediaQueryListEvent | Event = undefined
  ) {
    if (data) {
      if ("matches" in data) {
        const subscribers = this.#subscribers.get(type);
        if (subscribers) {
          subscribers.forEach((e) => {
            e(this, data);
          });
        } else
          throw new Error(`no subscriber for this event: ${type}`);
      } else {
        const subscribers = this.#eventSubs.get(type);
        if (subscribers) {
          subscribers.forEach((e) => {
            e(this, data);
          });
        } else
          throw new Error(`no subscriber for this event: ${type}`);
      }
    } else {
      const subscribers = this.#subscribers.get(type);
      if (subscribers) {
        subscribers.forEach((e) => {
          e(this, undefined);
        });
      } else
        throw new Error(`no subscriber for this event: ${type}`);
    }
  }
  on(type: "load", subscriber: EventHandler): this;
  on(type: keyof typeof App.events, subscriber: EventHandler): this;
  on(
    type: keyof typeof App.events,
    subscriber: EmitHandler | EventHandler
  ): this {
    const subscribers = this.#subscribers.get(type);
    const eventSub = this.#eventSubs.get(type);
    if (type === "load" || type === "dom" || type === "nostr") {
      if (eventSub) {
        eventSub.push(subscriber as EventHandler);
      } else
        this.#eventSubs.set(type, [subscriber as EventHandler]);
    } else {
      if (subscribers) subscribers.push(subscriber as EmitHandler);
      else this.#subscribers.set(type, [subscriber as EmitHandler]);
    }
    return this;
  }
  appendTo = (to: "body" | "layout", element: HTMLElement) => {
    if (to === "body") {
      this.value.window.document
        .getElementsByTagName(to)[0]
        .appendChild(element);
    } else {
      this.value.window.document
        .getElementById(to)
        ?.appendChild(element);
    }
  };
  appendToBody = (element: HTMLElement) => {
    return this.appendTo("body", element);
  };
  setBodyClassName = (className: string) => {
    const body = this.value.window.document
      .getElementsByTagName("body")
      .item(0);
    if (body) {
      body.className = className;
    }
  };
  get(path: string): UIDesign[] | UIDesign {
    const filtered = this.value.nodeslist.filter(
      (e) => e.path === path
    );
    if (filtered.length === 1) return filtered[0];
    return this.value.nodeslist.filter((e) => e.path === path);
  }
  #startSocket = App.Relay.Socket.startSocket;
}
export namespace App {
  export enum events {
    dom = "dom",
    load = "load",
    ["no-provider"] = "no-provider",
    ["got-provider"] = "got-provider",
    nostr = "nostr",
    themeChange = "themeChange",
    orientationChange = "orientationChange",
    minWidth768Change = "minWidth768Change",
    requestedProvider = "requestedProvider",
    relaymessage = "relaymessage",
  }
  export const getThemeQuery = (window: Window) =>
    checkMediaQuery(window)("(prefers-color-scheme: dark)");
  export const getOrientation = (window: Window) =>
    checkMediaQuery(window)("(orientation: landscape)");
  export const getMinWith768 = (window: Window) =>
    checkMediaQuery(window)("(min-width: 768px)");
  const checkMediaQuery = (window: Window) => (string: string) =>
    window.matchMedia(string);

  export namespace WebLN {
    export const isWebLN = (window: iWindow) =>
      window.WebLN ? true : false;
  }

  export namespace UserAgent {
    type useragent = string;
    type device = string;
    type operatingSystem = string;
    type webKitVersion = string;
    type layoutEngine = string;
    type browser_browserVersion = string;
    export interface iUserAgentInfo {
      userAgent: string;
      device: string;
      operatingSystem: string;
      webKitVersion: string;
      layoutEngine: string;
      browser: string;
      browserVersion: string;
    }
    export class UserAgentInfo {
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
          .map((e) => e.trim())
          .map((e) => e.split(")"))
          .flat()
          .map((e) => e.trim())
          .map((e) => e.split(";"))
          .flat()
          .map((e) => e.trim());
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
          browser: arr[5].split("/")[0],
          browserVersion: arr[5].split("/")[1],
        };
        return obj;
      }
    }
    export const isMobile = (userAgent: string) =>
      /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
        userAgent
      );
  }

  export namespace Relay {
    interface EventData {
      id: string;
      pubkey: string;
      created_at: string;
      kind: string;
      tags: string[][];
      content: string;
      sig: string;
    }
    export interface UIMessage {
      content: string;
      type: "user" | "community";
      from: string;
    }
    export enum relays {
      damus = `wss://relay.damus.io`,
      noslol = "wss://nos.lol/",
    }
    export namespace Socket {
      enum socketEvents {
        open = "open",
        message = "message",
        upgrade = "upgrade",
        close = "close",
        error = "error",
      }
      export const startSocket = (listeners?: {
        close?: (socket: WebSocket) => CloseHandler;
        error?: (socket: WebSocket) => ErrorHandler;
        message?: MessageHandler;
        open?: (socket: WebSocket) => OpenHandler;
      }) => {
        console.log("starting socket..");
        const socket = new WebSocket(App.Relay.relays.damus);
        socket;
        console.log(socket);
        setTimeout(() => {
          socket.close();
          console.log("socket closed");
        }, 20_000);
        if (listeners) {
          if (listeners.close)
            socket.addEventListener(
              socketEvents.close,
              listeners.close(socket)
            );
          if (listeners.error)
            socket.addEventListener(
              socketEvents.error,
              listeners.error(socket)
            );
          if (listeners.message)
            socket.addEventListener(
              socketEvents.message,
              listeners.message
            );
          if (listeners.open)
            socket.addEventListener(
              socketEvents.open,
              listeners.open(socket)
            );
        }
      };
    }

    export enum clientMessages {
      event = "EVENT",
      request = "REQ",
      close = "CLOSE",
    }

    export enum serverMessages {
      event = "EVENT",
      eose = "EOSE",
      notice = "NOTICE",
    }

    export const openHandler: (socket: WebSocket) => OpenHandler =
      (socket) => (ev) => {
        console.log("Connessione stabilita.");
        const generatestring = () =>
          `${Math.round(Math.random() * 10 ** 16).toString(
            16
          )}${Math.round(Math.random() * 10 ** 16).toString(16)}`;

        const sub_id = generatestring();
        const filter = {
          // authors: [author],
          kinds: [1],
          limit: 10,
        };
        const tnl_chat =
          "d6b49c39cd99e892bb745348504574c11c399a8e2d86cbe3bb182f45e0af8fae";
        const groupMessageFilter = {
          kinds: [42],
          limit: 10,
        };
        const tnl_group_chat = {
          kinds: [42],
          limit: 10,
          ["#e"]: [tnl_chat],
        };
        const message = [
          clientMessages.request,
          sub_id,
          tnl_group_chat,
        ];
        // Invia un messaggio al server
        socket.send(JSON.stringify(message));
      };

    const isStoredData = { value: true };
    const storedDatas: UIMessage[] = [];
    const liveDatas: UIMessage[] = [];
    export const messageHandler: (
      printMessage?: (prop: UIMessage[]) => void,
      saveToLocalStorage?: (data: UIMessage[]) => void
    ) => (userkey?: string) => MessageHandler =
      (sendmessage, saveToLocalStorage) =>
      (userkey) =>
      (message) => {
        // Riceve un messaggio dal server

        const data = JSON.parse((message as any).data) as [
          keyof typeof serverMessages,
          string,
          EventData
        ];
        const type = data[0];
        const subid = data[1];
        const event = data[2];
        enum clientLogMessages {
          event = "Messaggio ricevuto:",
          notice = "Receive an error from relay:",
          eose = "End of stored events, starting live events:",
        }
        // if (type === "EVENT") console.log(clientLogMessages.event, data.content);

        const handleEvent = (type: keyof typeof serverMessages) => {
          if (isStoredData.value) {
            if (userkey === event.pubkey) {
              storedDatas.push({
                content: event.content,
                from: event.pubkey,
                type: "user",
              });
            } else {
              storedDatas.push({
                content: event.content,
                from: event.pubkey,
                type: "community",
              });
            }
          }
          {
            if (event.tags.length) {
            }
            // console.log(clientLogMessages.event, event.tags, event.content);
          }
        };
        const handleError = () =>
          console.log(clientLogMessages.notice, data);

        const handleEose = () => {
          if (sendmessage) sendmessage(storedDatas.reverse());
          isStoredData.value = false;
          console.log(clientLogMessages.eose, data);
        };

        enum serverMessages {
          event = "EVENT",
          eose = "EOSE",
          notice = "NOTICE",
        }

        let map = new Map();
        map.set(serverMessages.event, handleEvent);
        map.set(serverMessages.eose, handleEose);
        map.set(serverMessages.notice, handleError);
        const action = map.get(type);
        action(type);
      };
  }
}
