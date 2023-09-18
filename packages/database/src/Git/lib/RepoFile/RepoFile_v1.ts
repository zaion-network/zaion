import { File } from "@zionstate/zionbase/zionbase";
import { TreeNodeBasicProps } from "../Types";

export interface RepoFile_v1Props
  extends TreeNodeBasicProps {}

export interface IRepoFile_v1 {}

export interface RepoFile_v1 extends File {}

export class RepoFile_v1
  extends File
  implements IRepoFile_v1
{
  constructor(props: RepoFile_v1Props) {
    super(
      props.name,
      props.path,
      props.typeNumber,
      props.treeId,
      props.depth
    );
  }
}

export type RepoFile_v1Ctor = {
  new (props: RepoFile_v1Props): RepoFile_v1;
};

export const RepoFile_v1Ctor: RepoFile_v1Ctor =
  RepoFile_v1;
