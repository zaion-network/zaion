import { NewContext } from "./Context";
import { DeepUtilities } from "../../DeepUtilities";

interface Dathing {
  name: string;
  loaded: boolean;
}

class DathingState extends NewContext.State<Dathing> {}

// type ChangeableValue<V> = DeepUtilities.Mixins.Mixin.Mixin<
//   new () => NewContext.State<V>,
//   new () => {
//     changeValue(state: NewContext.State<V>): void;
//   }
// >;
// const ChangeableValue: ChangeableValue<Dathing> = (ctor) => {
//   return class Extended extends ctor {
//     changeValue(state: NewContext.State<Dathing>) {
//       this.value = state.value;
//       const ctx = new Extended();
//       ctx.value = state.value;
//       return ctx;
//     }
//   };
// };

// type ChangeableState<V> = DeepUtilities.Mixins.Mixin.Mixin<
//   new () => { state: { value: V }; value: V },
//   new () => {
//     changeState(state: { value: V }): void;
//   }
// >;
// const ChangeableState: ChangeableState<Dathing> = (ctor) => {
//   return class Extended extends ctor {
//     changeState(state: { value: Dathing }) {
//       this.state = state;
//       this.value = state.value;
//     }
//   };
// };
// class NewClass extends new DeepUtilities.Mixins.MixEvo(DathingState).with(
//   ChangeableValue,
//   ChangeableState
// ) {}
// const newclass = new NewClass({ name: "my name", loaded: false });
// console.log(newclass);
// newclass.changeValue({ value: { name: "ola", loaded: true } });
// console.log(newclass);
// newclass.changeState({ value: { name: "minchia", loaded: false } });
// console.log(newclass);
