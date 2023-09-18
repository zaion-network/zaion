import { Root } from "@zionstate/zionbase/zionbase";
import { TreeNodeBasicProps } from "../Types";

export interface RepoRootProps
  extends TreeNodeBasicProps {}

export interface IRepoRoot_v1 {}

export interface RepoRoot_v1 extends Root {}

export class RepoRoot_v1
  extends Root
  implements IRepoRoot_v1
{
  constructor(props: RepoRootProps) {
    super(
      props.name,
      props.path,
      props.typeNumber,
      props.treeId,
      props.depth
    );
  }
}

export type RepoRoot_v1Ctor = {
  new (props: RepoRootProps): RepoRoot_v1;
};

export const RepoRoot_v1Ctor: RepoRoot_v1Ctor =
  RepoRoot_v1;
