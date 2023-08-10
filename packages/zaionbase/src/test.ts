enum DoorStates {
  open = "open",
  closed = "closed",
}
interface RuntimeState {
  doorstate: DoorStates;
}
class RuntimeState {
  constructor(app: Application, doorstate: DoorStates) {
    this.doorstate = doorstate;
    app.setOpen(this);
  }
}
interface Open extends RuntimeState {
  doorstate: DoorStates.open;
}
class Open extends RuntimeState {
  constructor(app: Application) {
    super(app, DoorStates.open);
  }
}
interface Closed extends RuntimeState {
  doorstate: DoorStates.closed;
}
class Closed extends RuntimeState {
  constructor(app: Application) {
    super(app, DoorStates.closed);
  }
}

export interface Application {
  state: RuntimeState;
}
export interface OpenApplication extends Application {
  state: Open;
  door: DoorStates.open;
}
export class Application {
  setOpen(state: RuntimeState) {
    console.log("state: ", state.doorstate);
    this.state = state;
    return this;
  }
  isOpen(): this is Open {
    return this.state instanceof Open;
  }
  isClosed(): this is Closed {
    return this.state instanceof Closed;
  }
  get door() {
    return this.state.doorstate;
  }
}

const app = new Application();

console.log(app);
new Closed(app);
console.log(app.isClosed());
new Open(app);
console.log(app.isOpen());

interface BoolMap<V> extends Map<boolean, V> {
  get(key: any): NonNullable<V>;
}
class BoolMap<V> extends Map<boolean, V> {
  get(key: boolean): NonNullable<V> {
    const value = super.get(key);
    if (value === undefined) {
      throw new Error("");
    }
    return value as NonNullable<V>;
  }
}
let map = new BoolMap<() => RuntimeState>();
map.set(true, () => new Closed(app));
let res = map.get(true);
