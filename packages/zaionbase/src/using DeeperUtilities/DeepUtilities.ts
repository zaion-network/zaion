import { DeeperUtilities as D } from "../DeeperUtilities";
import { Conditioner as C } from "./Conditioner";

declare module "./Conditioner" {}
declare module "../DeeperUtilities" {
  export namespace DeeperUtilities {
    // newly created
    export import Conditioner = C;
  }
}
// update
D.Conditioner = C;

export import DeepUtilities = D;
