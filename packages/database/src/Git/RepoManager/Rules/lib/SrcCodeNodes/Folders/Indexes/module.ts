import { SrcCodeNode } from "../../../../SrcCodeNode";

const { IndexRule } = SrcCodeNode;

export let module_rule = new IndexRule();

const { FolderContent, contents } = SrcCodeNode;

let commoncontents = [
  contents.module_optional,
  contents.extensions_optional,
  contents.decorators_optional,
  contents.module_file,
  contents.type_file,
  contents.test_file,
  contents.indexType_optional,
  contents.indexType_optional,
];

export let module = new SrcCodeNode(
  FolderContent.genres.module,
  module_rule
);

export let module_in_extension = new SrcCodeNode(
  "<module_in_extension>",
  module_rule
);

export let module_in_decorators = new SrcCodeNode(
  "<module_in_decorator>",
  module_rule
);

commoncontents.forEach(n => {
  module.addContent(n);
  module_in_extension.addContent(n);
  module_in_decorators.addContent(n);
});
