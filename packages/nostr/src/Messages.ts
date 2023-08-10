import { Nostr } from "./Nostr";

export namespace Messages {
  interface Record {
    [key: string]: string;
  }

  export enum messageSides {
    client_relay = "Client to Relay",
    relay_client = "Relay to Client",
  }

  export interface commonMessageTypes extends Record {}
  export var commonMessageTypes: commonMessageTypes;

  export interface clientMessageTypes extends Record {}
  export var clientMessageTypes: clientMessageTypes;

  export interface clientMessageDescriptions extends Record {}
  export var clientMessageDescriptions: clientMessageDescriptions;

  export interface relayMessageTypes extends Record {}
  export var relayMessageTypes: relayMessageTypes;

  export interface relayMessageDescriptions extends Record {}
  export var relayMessageDescriptions: relayMessageDescriptions;

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
    constructor(type: T, description: D, nip: Nostr.Nips.Nip<I, any>) {
      super(messageSides.relay_client, type, description, nip);
    }
  }

  export type AnyMessage = MessageDefinition<any, any, any, any>;
}
