import { Conditioner } from "../../../../Conditioner";
import { Action } from "../../../Action";

export interface Application<A extends Array<any>, R, C> {
  blocks: Application.Block<A, R, C>[];
  conditions: Application.Condition<A, R, C>[];
  nodes: Application.Node<A, R, C>[];
  start(node: Application.Node<A, R, C>): this;
}
export class Application<A extends Array<any>, R, C>
  implements Application.Application<A, R, C>
{
  constructor(public name: string) {
    this.conditions = [];
    this.nodes = [];
    this.blocks = [];
  }
  start(node: Application.Node<A, R, C>): this {
    if (node instanceof Application.Block) this.blocks.push(node);
    else if (node instanceof Application.Condition) this.conditions.push(node);
    this.nodes.push(node);
    return this;
  }
  show() {
    console.log(this);
  }
  run(): this {
    const nodes = [...this.nodes];
    const firstEl = nodes[0]!;
    if (firstEl.isBlock()) {
      const result = Application.startExecution(this, firstEl);
      return this;
    }
    return this;
  }
}
export namespace Application {
  const conditioner = new Conditioner();
  export interface Application<A extends Array<any>, R, C> {
    blocks: Application.Block<A, R, C>[];
    conditions: Application.Condition<A, R, C>[];
    nodes: Application.Node<A, R, C>[];
    start(node: Application.Node<A, R, C>): this;
    run(): this;
  }

  export const recurseExecution = <A extends Array<any>, R, C>(
    app: Application<A, R, C>,
    block: Application.Block<A, R, C>
  ) => {
    const satisfied = Application.getSatisfied(
      block.execute(...block.args),
      block.conditions
    );
    startExecution(app, satisfied.block);
    return app;
  };

  export const startExecution = <A extends Array<any>, R, C>(
    app: Application<A, R, C>,
    block: Application.Block<A, R, C>
  ): Application<A, R, C> | R => {
    return conditioner.boolean([
      block.hasConditions(),
      [
        [true, () => Application.recurseExecution(app, block), []],
        [false, () => block.execute(...block.args), []],
      ],
    ]);
    // if (block.hasConditions()) return oob(app, block);
    // return block.execute(...block.args);
  };

  export const getSatisfied = <A extends Array<any>, R, C>(
    result: R,
    conditions: Condition<A, R, C>[]
  ): Condition<A, R, C> => {
    return conditions.filter(filterCorrectCondition(result))[0]!;
  };

  export const filterCorrectCondition =
    <R>(result: R) =>
    <C extends Condition<any, any, C>>(c: C): boolean => {
      return c.condition === result;
    };

  export interface Node<A extends any[], R, C> {
    type: Node.types;
    isBlock(): this is Block<A, R, C>;
  }
  export class Node<A extends any[], R, C> implements Node.Node<A, R, C> {
    constructor(public type: Node.types) {}
    isBlock(): this is Block<A, R, C> {
      return this instanceof Block;
    }
    isCondition(): this is Condition<A, R, C> {
      return this instanceof Condition;
    }
  }
  export namespace Node {
    export interface Node<A extends any[], R, C> {
      type: types;
      isBlock(): this is Block<A, R, C>;
      isCondition(): this is Condition<A, R, C>;
    }
    export enum types {
      block = "block",
      condition = "condition",
    }
  }

  export interface Condition<A extends any[], R, C>
    extends Condition.Condition<A, R, C> {
    type: Node.types.condition;
    subtype: Condition.subTypes;
  }
  export class Condition<A extends any[], R, C>
    extends Node<A, R, C>
    implements Condition.Condition<A, R, C>
  {
    result: any;
    constructor(
      public subtype: Condition.subTypes,
      public condition: boolean,
      public block: Block<A, R, C>
    ) {
      super(Node.types.condition);
    }
    addConditionToBlock(condition: Condition<A, R, C>): this {
      this.block.addCondition(condition);
      return this;
    }
  }
  export namespace Condition {
    export interface Condition<A extends any[], R, C> extends Node<A, R, C> {
      type: Node.types.condition;
      subtype: Condition.subTypes;
      condition: boolean;
      block: Block<A, R, C>;
      addConditionToBlock(condition: Condition<A, R, C>): this;
    }
    export enum subTypes {
      boolean = "boolean",
      ifTrue = "ifTrue",
      ifFalse = "ifFalse",
      safeGuardError = "safeGuardError",
      elseif = "elseIf",
    }
    export class Boolean<A extends any[], R> extends Condition<A, R, boolean> {
      constructor(
        public condition: boolean,
        public block: Block<A, R, boolean>
      ) {
        super(subTypes.boolean, condition, block);
      }
    }
    export namespace Boolean {
      export interface Boolean<A extends any[], R>
        extends Condition<A, R, boolean> {
        subtype: subTypes.boolean;
      }
    }
  }

  export interface Block<A extends any[], R, C> extends Node<A, R, C> {
    type: Node.types.block;
    action: Action.genericAction<A, R>;
    args: A;
    conditions: Condition<A, R, C>[];
    addCondition(condition: Condition<A, R, C>): this;
    execute(...a: A): R;
  }
  export class Block<A extends any[], R, C>
    extends Node<A, R, C>
    implements Block.Block<A, R, C>
  {
    constructor(public action: Action.genericAction<A, R>, public args: A) {
      super(Node.types.block);
      this.conditions = [];
    }
    addCondition(condition: Condition<A, R, C>): this {
      this.conditions.push(condition);
      return this;
    }
    execute(...a: A): R {
      return this.action(...a);
    }
    hasConditions(): boolean {
      return this.conditions.length > 0;
    }
  }
  export namespace Block {
    export interface Block<A extends any[], R, C> {
      addCondition(condition: Condition<A, R, C>): this;
      execute(...a: A): R;
      hasConditions(): boolean;
    }
  }

  // export const Action = A;
  // export namespace Action {}

  // export const Result = HighUtilities.Context.Result;
  export namespace Result {}
}
