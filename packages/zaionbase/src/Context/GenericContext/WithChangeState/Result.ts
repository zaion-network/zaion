import { WithChangeState } from "../WithChangeState";

export interface Result<T> extends Result.Result<T> {}
export class Result<T>
  extends WithChangeState<Result.ResultState<T>, T>
  implements Result.Result<T>
{
  get state() {
    return this.hiddenstate;
  }

  set state(state) {
    this.hiddenstate = state;
  }
  constructor(value?: T) {
    super();
    if (value) {
      (this.state as Result.ResultState.Fullfilled<T>) =
        new Result.ResultState.Fullfilled(value, this);
    } else {
      (this.state as Result.ResultState.Undefined) =
        new Result.ResultState.Undefined(this as Result.Undefined);
    }
  }
  get status() {
    return this.state.status;
  }
  get value() {
    return this.state.value;
  }
  isUndefined(): this is Result.Undefined {
    return this.state.isUndefined();
  }
  isPending(): this is Result.Pending {
    return this.state.isPending();
  }
  isFullfilled(): this is Result.Fullfilled<T> {
    return this.state.isFullfilled();
  }
}
export namespace Result {
  export interface Result<T>
    extends WithChangeState.Context<ResultState<T>, T> {
    status: status;
    isUndefined(): this is Undefined;
    isPending(): this is Pending;
    isFullfilled(): this is Fullfilled<T>;
  }
  export enum status {
    undefined = "undefined",
    pending = "pending",
    fullfilled = "fullfilled",
  }
  export interface Undefined extends Result<undefined> {
    status: status.undefined;
    state: ResultState.Undefined;
  }
  export interface Pending extends Result<undefined> {
    status: status.pending;
    state: ResultState.Pending;
  }
  export interface Fullfilled<T> extends Result<T> {
    status: status.fullfilled;
    state: ResultState.Fullfilled<T>;
  }
  export class ResultState<T>
    extends WithChangeState.State<Result<T>, T>
    implements ResultState.State<T>
  {
    get result() {
      return this.ctx;
    }
    set result(ctx) {
      this.ctx = ctx;
    }
    constructor(
      result: Result<T>,
      public status: Result.status,
      public value: T
    ) {
      super(result);
      this.result = result;
      this.result.changeState(this);
    }
    isUndefined(): this is ResultState.Undefined {
      return this instanceof ResultState.Undefined;
    }
    isPending(): this is ResultState.Pending {
      return this instanceof ResultState.Pending;
    }
    isFullfilled(): this is ResultState.Fullfilled<T> {
      return this instanceof ResultState.Fullfilled;
    }
  }
  export namespace ResultState {
    export interface State<T> extends WithChangeState.State<any, T> {
      status: Result.status;
      isUndefined(): this is Undefined;
      isPending(): this is Pending;
      isFullfilled(): this is Fullfilled<T>;
    }
    export class Undefined extends ResultState<undefined> {
      constructor(result: Result<undefined>) {
        super(result, status.undefined, undefined);
      }
    }
    export class Pending extends ResultState<undefined> {
      constructor(result: Result<undefined>) {
        super(result, status.pending, undefined);
      }
    }
    export class Fullfilled<T> extends ResultState<T> {
      constructor(value: T, result: Result<T>) {
        super(result, status.fullfilled, value);
      }
    }
  }
}
