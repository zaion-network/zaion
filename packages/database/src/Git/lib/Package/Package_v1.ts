import { Folder } from "@zionstate/zionbase/zionbase";
import { TreeNodeBasicProps } from "../Types";

export interface IPackage_v1Props
  extends TreeNodeBasicProps {}

export interface IPackage_v1 {}

export interface Package_v1 extends Folder {}

export class Package_v1
  extends Folder
  implements IPackage_v1
{
  constructor(props: IPackage_v1Props) {
    super(
      props.name,
      props.path,
      props.typeNumber,
      props.treeId,
      props.depth
    );
    this.name = props.name;
  }
}

export type Package_v1Ctor = {
  new (props: IPackage_v1Props): Package_v1;
};

export const Package_v1Ctor: Package_v1Ctor = Package_v1;
