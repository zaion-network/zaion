import {
  EntrypointSrc,
  File,
  Module,
  Optional,
  OptionalEntrypointSrc,
  OptionalEntrypointSrcModule,
  OptionalEntrypointSrcExtensionModule,
  Required,
  Src,
  Test,
  Type,
} from "../extensions";

export let buildSh = new Required(
  Required.configFilesTypes.build,
  true
);

export let packagejson = new Required(
  Required.configFilesTypes.packagesjson,
  false
);

export let tsconfig = new Required(
  Required.configFilesTypes.tsconfig,
  false
);

export let index = new Required(
  Required.configFilesTypes.index,
  false
);

export let indexType = new Required(
  Required.configFilesTypes.indexTypes,
  false
);

export let gitignore_optional = new Optional(
  Optional.configFilesTypes.gitignore,
  "one",
  false
);

export let prettier_optional = new Optional(
  Optional.configFilesTypes.prettier,
  "one",
  false
);

export let babel_optional = new Optional(
  Optional.configFilesTypes.babel,
  "one",
  false
);

export let rollup_optional = new Optional(
  Optional.configFilesTypes.rollup,
  "one",
  false
);

export let next_optional = new Optional(
  Optional.configFilesTypes.next,
  "one",
  false
);

export let index_optional = new Optional(
  Optional.configFilesTypes.index,
  "one",
  false
);

export let indexType_optional = new Optional(
  Optional.configFilesTypes.indexTypes,
  "one",
  false
);

export let module_file = new File("module");

export let class_module = new Module("class");
export let component_module = new Module("component");
export let function_module = new Module("function");
export let hook_module = new Module("hook");
export let mixin_module = new Module("mixin");
export let styled_module = new Module("styled");

export let type_file = new File("type");

export let class_type = new Type("class");
export let component_type = new Type("component");
export let function_type = new Type("function");
export let hook_type = new Type("hook");
export let mixin_type = new Type("mixin");
export let styled_type = new Type("styled");

export let test_file = new File("test");

export let class_test = new Test("class");
export let component_test = new Test("component");
export let function_test = new Test("function");
export let hook_test = new Test("hook");
export let mixin_test = new Test("mixin");
export let styled_test = new Test("styled");

// src

export let ep_src_opt = new Src(
  "src",
  "many",
  "optional",
  true
);

// alias

export let module_dir = new EntrypointSrc(
  "required",
  "many",
  "module"
);

// alias
let OESFC = OptionalEntrypointSrc;

export let lib_optional = new OESFC("many", "lib");

export let module_optional = new OESFC("many", "module");

export let sub_src_optional = new OESFC(
  "one",
  "entrypoint_sub_src"
);

export let extensions_optional =
  new OptionalEntrypointSrcModule("extensions");
export let decorators_optional =
  new OptionalEntrypointSrcModule("decorators");

export let leaf_module =
  new OptionalEntrypointSrcExtensionModule("many");
