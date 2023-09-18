import { SrcCodeGraph } from "../SrcCodeGraph";
import {
  app,
  apps,
  entrypointSrc,
  pack,
  packs,
  src,
  leaf,
  extension,
  module,
  lib,
  decorator,
  root,
  bin,
  test as testNode,
  dist,
  nodeModules,
  entrypoint,
  vscode,
  babel,
  rollup,
  packagejson,
  tsconfigjson,
  gitignore,
  prettier,
  build,
  next,
  proposals,
  tasks,
  assets,
  chatGPT,
  module_in_extension,
  module_in_decorators,
  indexNode,
  indexTypeNode,
  src_in_entrypointSrc,
  publicNode,
  tasks_apps,
  tasks_package,
} from "../../lib/SrcCodeNodes";
import { SrcCodeNode } from "../../SrcCodeNode";
import type { Rule } from "../../Rule";

const { PackageRule, AppRule } = SrcCodeNode;

// packages
let packages_tuples: [string, Rule][] = [
  ["database", new PackageRule()],
  ["ui", new PackageRule()],
  ["new-ui", new PackageRule()],
  ["test", new PackageRule()],
  ["zionbase", new PackageRule()],
];
let [database, ui, newUi, test, zionbase] =
  packages_tuples.map(t => {
    return new SrcCodeNode(t[0], t[1]);
  });

// apps
let apps_tuple: [string, Rule][] = [
  ["cli", new AppRule()],
  ["gun-server", new AppRule()],
  ["gun-ui", new AppRule()],
  ["landing-page", new AppRule()],
  ["nft-minter", new AppRule()],
  ["scripts", new AppRule()],
  ["social", new AppRule()],
  ["spesa", new AppRule()],
  ["test-next-13", new AppRule()],
  ["test-ui", new AppRule()],
  ["zaion", new AppRule()],
  ["zaion-server", new AppRule()],
];

let [
  cli,
  gunServer,
  gunUi,
  landingPage,
  nftMinter,
  scripts,
  social,
  spesa,
  testNext13,
  testUi,
  zaion,
  zaionServer,
] = apps_tuple.map(t => {
  return new SrcCodeNode(t[0], t[1]);
});

let graph = new SrcCodeGraph();
graph.addNode(root);
// packages
graph.addNode(packs);
graph.addNode(pack);
// packages/packlist
graph.addNode(ui);
graph.addNode(database);
graph.addNode(newUi);
graph.addNode(test);
graph.addNode(zionbase);
// apps
graph.addNode(apps);
graph.addNode(app);
// app/applist
graph.addNode(cli);
graph.addNode(gunServer);
graph.addNode(gunUi);
graph.addNode(landingPage);
graph.addNode(nftMinter);
graph.addNode(scripts);
graph.addNode(social);
graph.addNode(spesa);
graph.addNode(testNext13);
graph.addNode(testUi);
graph.addNode(zaion);
graph.addNode(zaionServer);
// src
graph.addNode(src);
graph.addNode(src_in_entrypointSrc);
graph.addNode(entrypointSrc);
graph.addNode(leaf);
graph.addNode(extension);
graph.addNode(decorator);
graph.addNode(module);
graph.addNode(module_in_extension);
graph.addNode(module_in_decorators);
graph.addNode(lib);
graph.addNode(bin);
graph.addNode(testNode);
graph.addNode(dist);
graph.addNode(nodeModules);
graph.addNode(entrypoint);
graph.addNode(vscode);
graph.addNode(babel);
graph.addNode(rollup);
graph.addNode(packagejson);
graph.addNode(tsconfigjson);
graph.addNode(gitignore);
graph.addNode(prettier);
graph.addNode(build);
graph.addNode(next);
graph.addNode(proposals);
graph.addNode(publicNode);
graph.addNode(tasks);
graph.addNode(tasks_apps);
graph.addNode(tasks_package);
graph.addNode(assets);
graph.addNode(chatGPT);
graph.addNode(indexNode);
graph.addNode(indexTypeNode);

// connections
// root
graph.connectNodes(root, apps);
graph.connectNodes(root, packs);
graph.connectNodes(root, bin);
graph.connectNodes(root, proposals);
graph.connectNodes(root, tasks);
graph.connectNodes(root, vscode);
graph.connectNodes(root, assets);
graph.connectNodes(root, chatGPT);
// root/packs
graph.connectNodes(packs, pack);
graph.connectNodes(packs, database);
graph.connectNodes(packs, ui);
graph.connectNodes(packs, newUi);
graph.connectNodes(packs, test);
graph.connectNodes(packs, zionbase);
graph.connectNodes(database, pack);
graph.connectNodes(ui, pack);
graph.connectNodes(newUi, pack);
graph.connectNodes(test, pack);
graph.connectNodes(zionbase, pack);
// root/packs/pack
graph.connectNodes(pack, src);
graph.connectNodes(pack, bin);
graph.connectNodes(pack, testNode);
graph.connectNodes(pack, dist);
graph.connectNodes(pack, nodeModules);
graph.connectNodes(pack, entrypoint);
graph.connectNodes(pack, vscode);
graph.connectNodes(pack, babel);
graph.connectNodes(pack, rollup);
graph.connectNodes(pack, packagejson);
graph.connectNodes(pack, tsconfigjson);
graph.connectNodes(pack, gitignore);
graph.connectNodes(pack, prettier);
// root/packs/pack/src
graph.connectNodes(src, entrypointSrc);
// root/packs/pack/src/entrypointSrc
graph.connectNodes(entrypointSrc, module);
graph.connectNodes(entrypointSrc, lib);
graph.connectNodes(entrypointSrc, src_in_entrypointSrc);
// root/packs/pack/src/entrypointSrc/module
graph.connectNodes(module, extension);
graph.connectNodes(module, decorator);
graph.connectNodes(module, indexNode);
graph.connectNodes(module, indexTypeNode);
graph.connectNodes(module, leaf);
// root/packs/pack/src/entrypointSrc/module/leaf
graph.connectNodes(module, indexNode);
// root/packs/pack/src/entrypointSrc/module/extensions
graph.connectNodes(extension, module_in_extension);
graph.connectNodes(extension, indexNode);
// root/packs/pack/src/entrypointSrc/module/decorators
graph.connectNodes(decorator, module_in_decorators);
graph.connectNodes(decorator, indexNode);
// root/apps
graph.connectNodes(apps, app);
graph.connectNodes(apps, cli);
graph.connectNodes(apps, gunServer);
graph.connectNodes(apps, gunUi);
graph.connectNodes(apps, landingPage);
graph.connectNodes(apps, nftMinter);
graph.connectNodes(apps, scripts);
graph.connectNodes(apps, social);
graph.connectNodes(apps, spesa);
graph.connectNodes(apps, testNext13);
graph.connectNodes(apps, testUi);
graph.connectNodes(apps, zaion);
graph.connectNodes(apps, zaionServer);

graph.connectNodes(cli, app);
graph.connectNodes(gunServer, app);
graph.connectNodes(gunUi, app);
graph.connectNodes(landingPage, app);
graph.connectNodes(nftMinter, app);
graph.connectNodes(scripts, app);
graph.connectNodes(social, app);
graph.connectNodes(spesa, app);
graph.connectNodes(testNext13, app);
graph.connectNodes(testUi, app);
graph.connectNodes(zaion, app);
graph.connectNodes(zaionServer, app);
// root/apps/app
graph.connectNodes(app, src);
graph.connectNodes(app, bin);
graph.connectNodes(app, build);
graph.connectNodes(app, nodeModules);
graph.connectNodes(app, vscode);
graph.connectNodes(app, prettier);
graph.connectNodes(app, babel);
graph.connectNodes(app, rollup);
graph.connectNodes(app, next);

export { graph };

// spesa,
// testNext13,
// testUi,
// zaion,
// zaionServer,
