import { Folder } from "@zionstate/zionbase/zionbase";
import { TreeNodeBasicProps } from "../Types";

export interface RepoFolder_v1Props
  extends TreeNodeBasicProps {}

export interface IRepoFolder_v1 {}

export interface RepoFolder_v1 extends Folder {}

export class RepoFolder_v1
  extends Folder
  implements IRepoFolder_v1
{
  constructor(props: RepoFolder_v1Props) {
    super(
      props.name,
      props.path,
      props.typeNumber,
      props.treeId,
      props.depth
    );
  }
}

export type RepoFolder_v1Ctor = {
  new (props: RepoFolder_v1Props): RepoFolder_v1;
};

export const RepoFolder_v1Ctor: RepoFolder_v1Ctor =
  RepoFolder_v1;
