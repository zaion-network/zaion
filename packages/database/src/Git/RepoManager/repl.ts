import { FileSystemNode } from "./Graph/extensions/Node";
import { FolderMutatedUntracked } from "./Graph/extensions/Node/extensions/FileSystem/extensions/Folder";
import { Folder } from "./Graph/extensions/Node/extensions/FileSystem/extensions/Folder/Folder";
import { Repo } from "./Graph/extensions/Repo/Repo";
import { graph } from "./Rules/SrcCodeGraph/lib";
import { execSync } from "../lib/execSync";
// import { Branch } from "../Types/Branch.type";

let r = new Repo();
r.buildUntrackedTree();

// let folders: Folder[] | null = r.untrackedTree.find(n => {
//   return (n as unknown as Folder).kind === "folder";
// }) as unknown as Folder[];

// let nonoizfolders = folders.filter(n => {
//   return !n.hasNoiz();
// });

// let withnoizfolders = folders.filter(n => {
//   return n.hasNoiz();
// });

// let arr = nonoizfolders.map((n: any) => n.initialize());
// arr
//   .filter(t => {
//     if (t[1] === undefined) {
//       return true;
//     } else {
//       return false;
//     }
//   })
//   .map(t => t[0]);

// let totalfolders =
//   nonoizfolders.length + withnoizfolders.length;

// function done2() {
//   let percentage = withnoizfolders.length / totalfolders;
//   let rounded = Math.round(percentage * 10000) / 100;
//   return `${rounded}%`;
// }

// let rm: FolderMutatedUntracked =
//   r.untrackedTree.findByName(
//     "RepoManager"
//   ) as unknown as FolderMutatedUntracked;

// r.commitUntracked(rm);

// let lp: FolderMutatedUntracked =
//   r.untrackedTree.findByName(
//     "landing-page"
//   ) as unknown as FolderMutatedUntracked;

// r.commitUntracked(lp);

// let pr: FolderMutatedUntracked =
//   r.untrackedTree.findByName(
//     "proposals"
//   ) as unknown as FolderMutatedUntracked;

// r.commitUntracked(pr);
// enum replacer {
//   remote = "remote/",
// }
// /**
//  * Per funzionare correttamente questa funzione deve
//  * ricevere come argomento name il valore di ritorno del
//  * comando `git branch -a` che torna i valori formattati con
//  * `remote/` nel caso in cui un branch sia remote
//  * @param name
//  * @returns
//  */
// function makeBranch(name: string): Branch {
//   class B {
//     static replacer = replacer;
//     value: Branch;
//     constructor(name: string) {
//       this.value = {
//         type: "local",
//         name: "",
//         isRemote: false,
//         commitHash: "",
//         parentHashes: [],
//         commitCount: 0,
//         authorEmail: "",
//         authorName: "",
//         commitMessage: "",
//         creationDate: new Date(),
//         lastUpdated: new Date(),
//         //
//         filesChanged: 0,
//         insertions: 0,
//         deletions: 0,
//         //
//         isTrackingRemote: false,
//         trackedRemoteBranch: "",
//         // children
//         isMerged: false,
//         mergeTarget: [
//           { date: "", hash: "", message: "", name: "" },
//         ],
//         changes: { added: [], deleted: [], modified: [] },
//         refs: "",
//       };
//       let isRemote = name.includes(B.replacer.remote);
//       if (isRemote) name.replace(B.replacer.remote, "");
//       this.value.name = name;
//       this.value.isRemote = isRemote;
//       this.value.type = isRemote ? "remote" : "local";
//       execSync(
//         "git log --pretty=format:'%H,%an,%ce,$s,%ad' refs/heads/zaion/dev",
//         { trim: true }
//       );
//       execSync(
//         "git branch --contains refs/heads/zaion/dev --format '%(refname)' | sort",
//         { trim: true }
//       );
//       execSync(
//         "git log --name-status --pretty=format:'<%h, %an, %ct, %at, [%p]' refs/heads/stage",
//         { raw: true }
//       )
//         .split("<")
//         .filter(e => (e === "" ? false : true))
//         .map(e =>
//           e
//             .split("\n")
//             .filter(e => (e === "" ? false : true))
//         )
//         .map(e => {
//           let [first, ...rest] = e;
//           return [first, rest];
//         });
//     }
//   }

//   return new B(name).value;
// }

// r.git.log("getBranch", "refs/heads/zaion/main");
r.git.log("getCommit", "refs/heads/zaion/main");
r.git.branch("getBranch", "refs/heads/zaion/main");
