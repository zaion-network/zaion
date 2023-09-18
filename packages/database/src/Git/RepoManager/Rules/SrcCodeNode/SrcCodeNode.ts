import { FolderContent } from "../FolderContent";
import * as FolderContents from "../lib/FolderContents";
import {
  EntrypointSrcFolderRule,
  FolderRule,
  SrcFolderRule,
  FileRule,
  IndexRule,
  Module,
  Container,
  Rule,
  PackageRule,
  AppRule,
} from "../Rule";

const {
  babel_optional,
  bin,
  dist,
  entrypoint_optional,
  gitignore_optional,
  nodeModules,
  packagejson,
  prettier_optional,
  rollup_optional,
  src,
  test_optional,
  tsconfig,
  vscode_optional,
  build,
  class_module,
  class_test,
  class_type,
  component_module,
  component_test,
  component_type,
  decorators_optional,
  ep_src_opt,
  extensions_optional,
  function_module,
  function_test,
  function_type,
  hook_module,
  hook_test,
  hook_type,
  index,
  indexType,
  indexType_optional,
  index_optional,
  leaf_module,
  lib_optional,
  mixin_module,
  mixin_test,
  mixin_type,
  module_dir,
  module_file,
  module_optional,
  next_optional,
  styled_module,
  styled_test,
  styled_type,
  sub_src_optional,
  test,
  test_file,
  type_file,
  apps,
  buildSh,
  packages,
  assets_optional,
  chatGPT_optional,
  proposals,
  tasks,
} = FolderContents;

type FolderContentsKeys = keyof typeof FolderContents;
type FolderContentsWithType = {
  [key in FolderContentsKeys]: FolderContent;
};

export interface SrcCodeNode {
  value: string;
  rule: Rule;
  contents: FolderContent[];
}
export class SrcCodeNode {
  static FolderRule = FolderRule;
  static IndexRule = IndexRule;
  static ModuleRule = Module;
  static ContainerRule = Container;
  static PackageRule = PackageRule;
  static AppRule = AppRule;
  static SrcFolderRule = SrcFolderRule;
  static FileRule = FileRule;
  static EntrypointSrcFolderRule = EntrypointSrcFolderRule;
  static FolderContent = FolderContent;
  static contents: FolderContentsWithType = {
    src,
    test_optional,
    bin,
    dist,
    nodeModules,
    entrypoint_optional,
    vscode_optional,
    babel_optional,
    rollup_optional,
    packagejson,
    tsconfig,
    gitignore_optional,
    prettier_optional,
    build,
    class_module,
    class_test,
    class_type,
    component_module,
    component_test,
    component_type,
    decorators_optional,
    ep_src_opt,
    extensions_optional,
    function_module,
    function_test,
    function_type,
    hook_module,
    hook_test,
    hook_type,
    index,
    indexType,
    indexType_optional,
    index_optional,
    leaf_module,
    lib_optional,
    mixin_module,
    mixin_test,
    mixin_type,
    module_dir,
    module_file,
    module_optional,
    next_optional,
    styled_module,
    styled_test,
    styled_type,
    sub_src_optional,
    test,
    test_file,
    type_file,
    apps,
    buildSh,
    packages,
    assets_optional,
    chatGPT_optional,
    proposals,
    tasks,
  };
  constructor(public value: string, public rule: Rule) {
    this.contents = [];
  }
  addContent(content: FolderContent) {
    this.contents.push(content);
  }
}
