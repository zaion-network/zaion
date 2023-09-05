import { Nostr } from "./Nostr";

export namespace Messages {
  interface Record {
    [key: string]: string | undefined;
  }

  export enum messageSides {
    client_relay = "Client to Relay",
    relay_client = "Relay to Client",
  }

  export interface commonMessageTypes extends Record {}
  export const commonMessageTypes: commonMessageTypes = {
    auth: "AUTH",
    event: "EVENT",
    count: "COUNT",
  };

  export interface clientMessageTypes extends Record {}
  export const clientMessageTypes: clientMessageTypes = {
    req: "REQ",
    close: "CLOSE",
  };

  export interface clientMessageDescriptions extends Record {}
  export const clientMessageDescriptions: clientMessageDescriptions = {
    AUTH: "used to send authentication events",
    CLOSE: "used to stop previous subscriptions",
    EVENT: "used to publish events",
    REQ: "used to request events and subscribe to new updates",
    COUNT: "used to request event counts",
  };

  export interface relayMessageTypes extends Record {}
  export const relayMessageTypes: relayMessageTypes = {
    eose: "EOSE",
    notice: "NOTICE",
    ok: "OK",
  };

  export interface relayMessageDescriptions extends Record {}
  export const relayMessageDescriptions: relayMessageDescriptions = {
    AUTH: "used to send authentication challenges",
    COUNT: "used to send requested event counts to clients",
    EOSE: "used to notify clients all stored events have been",
    EVENT: "used to send events requested to clients",
    NOTICE: "used to send human-readable messages to clients",
    OK: "used to notify clients if an EVENT was successful",
  };

  export interface MessageDefinition<
    S extends messageSides,
    T extends
      | (typeof commonMessageTypes)[string]
      | (typeof clientMessageTypes)[string]
      | (typeof relayMessageTypes)[string],
    D extends
      | (typeof clientMessageDescriptions)[string]
      | (typeof relayMessageDescriptions)[string],
    I extends number
  > {
    side: S;
    type: T;
    description: D;
    // @ts-ignore
    nip: Nostr.Nips.Nip<I, any>;
  }
  export class MessageDefinition<
    S extends messageSides,
    T extends
      | (typeof commonMessageTypes)[string]
      | (typeof clientMessageTypes)[string]
      | (typeof relayMessageTypes)[string],
    D extends
      | (typeof clientMessageDescriptions)[string]
      | (typeof relayMessageDescriptions)[string],
    I extends number
  > implements MessageDefinition<S, T, D, I>
  {
    constructor(
      public side: S,
      public type: T,
      public description: D,
      // @ts-ignore
      nip: Nostr.Nips.Nip<I, any>
    ) {
      nip.addMessage(this);
    }
  }

  export interface ClientMessageDefinition<
    T extends
      | (typeof commonMessageTypes)[string]
      | (typeof clientMessageTypes)[string],
    D extends (typeof clientMessageDescriptions)[string],
    I extends number
  > extends MessageDefinition<messageSides.client_relay, T, D, I> {}
  export class ClientMessageDefinition<
      T extends
        | (typeof commonMessageTypes)[string]
        | (typeof clientMessageTypes)[string],
      D extends (typeof clientMessageDescriptions)[string],
      I extends number
    >
    extends MessageDefinition<messageSides.client_relay, T, D, I>
    implements ClientMessageDefinition<T, D, I>
  {
    // @ts-ignore
    constructor(type: T, description: D, nip: Nostr.Nips.Nip<I, any>) {
      super(messageSides.client_relay, type, description, nip);
    }
  }

  export interface RelayMessageDefinition<
    T extends
      | (typeof commonMessageTypes)[string]
      | (typeof relayMessageTypes)[string],
    D extends (typeof relayMessageDescriptions)[string],
    I extends number
  > extends MessageDefinition<messageSides.relay_client, T, D, I> {}
  export class RelayMessageDefinition<
      T extends
        | (typeof commonMessageTypes)[string]
        | (typeof relayMessageTypes)[string],
      D extends (typeof relayMessageDescriptions)[string],
      I extends number
    >
    extends MessageDefinition<messageSides.relay_client, T, D, I>
    implements RelayMessageDefinition<T, D, I>
  {
    // @ts-ignore
    constructor(type: T, description: D, nip: Nostr.Nips.Nip<I, any>) {
      super(messageSides.relay_client, type, description, nip);
    }
  }

  export type AnyMessage = MessageDefinition<any, any, any, any>;
}
