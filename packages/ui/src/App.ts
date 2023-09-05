import { requestProvider, WebLNProvider } from "webln";
import { UserAgent as UA } from "./UserAgent";
import type { UIDesign } from "./UIDesign";

declare module "./App" {
  interface GenericCallback<T, E, R> {
    (this: T, ev: E): R;
  }
  interface Callback<T extends Array<any>> {
    (...args: T): void;
  }
  interface EventHandler extends Callback<[App, Event | undefined]> {}
  interface EmitHandler
    extends Callback<[App, undefined | MediaQueryListEvent]> {}
  interface iWindow extends Window {
    WebLN?: { requestProvider: typeof requestProvider };
  }
  interface OpenHandler extends GenericCallback<WebSocket, Event, any> {}
  interface ErrorHandler extends GenericCallback<WebSocket, Event, any> {}
  interface CloseHandler extends GenericCallback<WebSocket, CloseEvent, any> {}
  interface MessageHandler
    extends GenericCallback<WebSocket, MessageEvent<any>, any> {}
}
export interface iApp {
  window: Window;
  userAgent: UA.UserAgentInfo;
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
    this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
    this.value.isWebln = App.WebLN.isWebLN(this.value.window);
    this.value.window.addEventListener("load", mkecb(App.events.load));
    this.value.window.addEventListener(
      "DOMContentLoaded",
      mkcb(App.events.dom)
    );
    this.themeQuery.addEventListener("change", mkecb(App.events.themeChange));
    this.orientationQuery.addEventListener(
      "change",
      mkcb(App.events.orientationChange)
    );
    this.value.isMinWIth768 = this.minWidth768Query.matches;
    this.minWidth768Query.addEventListener(
      "change",
      mkcb(App.events.minWidth768Change)
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
  makeEmitCb = (type: App.events) => (data: MediaQueryListEvent | Event) =>
    this.emit(type, data);
  makeEmitEventCb = (type: App.events) => (data: MediaQueryListEvent | Event) =>
    this.emit(type, data);
  requestProvider = async () => {
    this.emit(App.events.requestedProvider);
    try {
      setTimeout(async () => {
        (globalThis as any).that = (window as iWindow).WebLN!.requestProvider;
        this.value.webln = await (window as iWindow).WebLN!.requestProvider();
        this.emit(App.events.gotProvider);
      }, 100);
    } catch (error) {
      console.log("passed here too");
      this.emit(App.events.noProvider);
    }
  };
  checkNostr = () => {
    if ((window as any).nostr) {
      this.emit(App.events.nostr, (window as any).nostr);
    } else {
      console.log("nostr not found");
    }
  };
  #subscribers = new Map<App.events, EmitHandler[]>();
  #eventSubs = new Map<App.events, EventHandler[]>();
  emit(
    type: App.events,
    data: undefined | MediaQueryListEvent | Event = undefined
  ) {
    if (data) {
      if ("matches" in data) {
        const subscribers = this.#subscribers.get(type);
        if (subscribers) {
          subscribers.forEach(e => {
            e(this, data);
          });
        } else throw new Error(`no subscriber for this event: ${type}`);
      } else {
        const subscribers = this.#eventSubs.get(type);
        if (subscribers) {
          subscribers.forEach(e => {
            e(this, data);
          });
        } else throw new Error(`no subscriber for this event: ${type}`);
      }
    } else {
      const subscribers = this.#subscribers.get(type);
      if (subscribers) {
        subscribers.forEach(e => {
          e(this, undefined);
        });
      } else throw new Error(`no subscriber for this event: ${type}`);
    }
  }
  on(type: App.events.load, subscriber: EventHandler): this;
  on(type: App.events, subscriber: EventHandler): this;
  on(type: App.events, subscriber: EmitHandler | EventHandler): this {
    const subscribers = this.#subscribers.get(type);
    const eventSub = this.#eventSubs.get(type);
    if (
      type === App.events.load ||
      type === App.events.dom ||
      type === App.events.nostr
    ) {
      if (eventSub) {
        eventSub.push(subscriber as EventHandler);
      } else this.#eventSubs.set(type, [subscriber as EventHandler]);
    } else {
      if (subscribers) subscribers.push(subscriber as EmitHandler);
      else this.#subscribers.set(type, [subscriber as EmitHandler]);
    }
    return this;
  }
  appendTo = (to: "body" | "layout", element: HTMLElement) => {
    if (to === "body") {
      this.value.window.document
        .getElementsByTagName(to)[0]!
        .appendChild(element);
    } else {
      this.value.window.document.getElementById(to)?.appendChild(element);
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
    const filtered = this.value.nodeslist.filter(e => e.path === path);
    if (filtered.length === 1) return filtered[0]!;
    return this.value.nodeslist.filter(e => e.path === path);
  }
  // #startSocket = R.Socket.startSocket;
}
export namespace App {
  export enum events {
    dom = "dom",
    load = "load",
    noProvider = "no-provider",
    gotProvider = "got-provider",
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
    export const isWebLN = (window: iWindow) => (window.WebLN ? true : false);
  }

  export const UserAgent = UA;
}
