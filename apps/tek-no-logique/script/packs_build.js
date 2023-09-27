import { App } from "./App";
import { app } from "./build";

const map = new Map();
map.set();

const hpackagebuildstarted = adaptedDeps => {
  console.log(adaptedDeps);
  // console.log("bumbala");
};

app.on(App.PACKAGE_BUILD_STARTED, hpackagebuildstarted);

app.startPackageBuild();

// app.getPacksToBuild(({scope,parsed}) => {
//   if("dependecies" in parsed) {}
// });

// app.on(App.GOT_PACKS_TO_BUILD, cwds => {
//   app.buildPacks(cwd => {
//     Bun.spawn({cmd:["bun","run","build"],stdout:"pipe",cwd}).stdout
//   }, cwds);
// });
