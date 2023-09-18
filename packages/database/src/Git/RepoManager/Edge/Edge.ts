import {
  BlockChild as BlockChildType,
  BlockParent as BlockParentType,
  Children as C,
  Parent as ParentType,
  Parents as ParentsType,
  CommitBlock as CommitBlockType,
  CommitParents as CommitParentsType,
  Changes as ChangesType,
  Commits as CommitsType,
  Head as HeadType,
  Tree as TreeType,
} from "./Edge.type";

export class BlockChild extends BlockChildType {}

export class BlockParent extends BlockParentType {}

export class Children extends C {}

export class Parent extends ParentType {}

export class Parents extends ParentsType {}

export class Changes extends ChangesType {}

export class CommitBlock extends CommitBlockType {}

export class CommitParents extends CommitParentsType {}

export class Commits extends CommitsType {}

export class Head extends HeadType {}

export class Tree extends TreeType {}
