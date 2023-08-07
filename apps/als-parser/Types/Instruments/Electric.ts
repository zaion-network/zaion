import { AbletonInstrumentsCommon } from "../Device";

export interface LoungeLizard extends AbletonInstrumentsCommon {
  Polyphony: string;
  PitchBendRange: string;
  Volume: string;
  KeyboardTranspose: string;
  KeyboardFineTune: string;
  KeyboardStretch: string;
  MalletStiffness: string;
  MalletStiffnessKeyboard: string;
  MalletStiffnessVelocity: string;
  MalletForceStrength: string;
  MalletForceKeyboard: string;
  MalletForceVelocity: string;
  MalletNoisePitch: string;
  MalletNoiseDecay: string;
  MalletNoiseAmount: string;
  MalletNoiseKeyboardScaling: string;
  ForkReleaseTime: string;
  ForkTineDecay: string;
  ForkTineVolume: string;
  ForkTineKeyboardScaling: string;
  ForkTineColor: string;
  ForkToneBarDecay: string;
  ForkToneBarVolume: string;
  PickupSymmetry: string;
  PickupDistance: string;
  PickupModel: string;
  PickupAmpIn: string;
  PickupAmpOut: string;
  PickupAmpKeyboardScaling: string;
  DamperTone: string;
  DamperAmount: string;
  DamperBalance: string;
}
