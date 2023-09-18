import { Required } from "../extensions";
import { Optional } from "../extensions";

const { sorts } = Required;
const { nodeModules: nm } = sorts;

export let apps = new Required(sorts.root, false);
export let packages = new Required(sorts.root, false);
export let proposals = new Required(sorts.root, true);
export let tasks = new Required(sorts.root, true);
export let nodeModules = new Required(nm, true);

export let src = new Required(sorts.packages, false);
export let test = new Required(sorts.packages, false);
export let bin = new Required(sorts.bin, false);
export let dist = new Required(sorts.packages, true);
export let build = new Required(sorts.apps, true);

export let assets_optional = new Optional(
  sorts.root,
  "one",
  false
);

export let chatGPT_optional = new Optional(
  sorts.root,
  "one",
  false
);

export let test_optional = new Optional(
  sorts.packages,
  "one",
  false
);

export let entrypoint_optional = new Optional(
  sorts.packages,
  "many",
  true
);

export let vscode_optional = new Optional(
  sorts.packages,
  "one",
  true
);
