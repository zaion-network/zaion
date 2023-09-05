import { BasicTypes as B } from "./BasicTypes";
import { Tags as T } from "./Tags";
import { Nips as N } from "./Nips";
import { Messages as M } from "./Messages";
import { Kinds as K } from "./Kinds";
// import { Event as E } from "./Nips/Nip_001/Event";

export namespace Nostr {
  export import BasicTypes = B;
  export import Kinds = K;
  export import Messages = M;
  export import Nips = N;
  export import Tags = T;
}
