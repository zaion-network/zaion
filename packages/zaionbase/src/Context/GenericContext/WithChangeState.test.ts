import { Context } from "../../Context";

const CTXWCHANGESTATEEXAMPLE = 1;

const contextWithChangeStateExample = () => {
  abstract class LightState extends Context.WithChangeState.State<Light> {
    get light() {
      return this.ctx;
    }
    constructor(light: Light) {
      super(light);
    }

    abstract on(): void;
    abstract off(): void;
  }

  class OnState extends LightState {
    constructor(light: Light) {
      super(light);
    }

    on(): void {
      console.log("La luce è già accesa.");
    }

    off(): void {
      console.log("Spengo la luce.");
      this.light.changeState(new OffState(this.light));
    }
  }

  class OffState extends LightState {
    constructor(light: Light) {
      super(light);
    }

    on(): void {
      console.log("Accendo la luce.");
      this.light.changeState(new OnState(this.light));
    }

    off(): void {
      console.log("La luce è già spenta.");
    }
  }

  class Light extends Context.WithChangeState<LightState> {
    constructor() {
      super();
      this.changeState(new OffState(this));
    }

    on(): void {
      this.state.on();
    }

    off(): void {
      this.state.off();
    }
  }

  // Utilizzo
  const light = new Light();

  light.on(); // Accendo la luce.
  light.off(); // Spengo la luce.
  light.off(); // La luce è già spenta.
  light.on(); // Accendo la luce.
  light.on(); // La luce è già accesa.
};
if (CTXWCHANGESTATEEXAMPLE) contextWithChangeStateExample();
