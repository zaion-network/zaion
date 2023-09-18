import { Folder } from "@zionstate/zionbase/zionbase";
import { TreeNodeBasicProps } from "../Types";

export interface IApp_v1Props extends TreeNodeBasicProps {}

export interface IApp_v1 {}

export interface App_v1 extends Folder {}

export class App_v1 extends Folder implements IApp_v1 {
  constructor(props: IApp_v1Props) {
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

export type App_v1Ctor = {
  new (props: IApp_v1Props): App_v1;
};

export const App_v1Ctor: App_v1Ctor = App_v1;
