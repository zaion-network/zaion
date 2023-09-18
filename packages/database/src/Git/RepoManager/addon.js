async function filterCurrentBranchFromList(repo) {
  let children = await repo.getChildBranches();
  return children
    .filter(e => !e.includes(repo.currentBranch))
    .filter(e => !e.includes(repo.currentBranch.replace("main", "dev")));
}

function checkIfTagExists(tag, repo) {
  return repo.tags.includes(tag);
}

function makeMainBranchRelease(branch) {
  let base = branch.replace("main", "");
  let mainreleasetag = `${base}0.0.0`;
  return [mainreleasetag, base];
}

function makeDevBranchRelease(branch, version) {
  let base = branch.replace("dev", "");
  let mainreleasetag = `${base}${version}`;
  return [mainreleasetag, base];
}

function isMain(branch) {
  return branch.includes("main");
}

function isDev(branch) {
  return branch.includes("dev");
}

async function createReleaseTagForMainAndDev(branch, repo) {
  // make tags
  let tag;
  if (isMain(branch)) [tag, base] = makeMainBranchRelease(branch);
  else if (isDev(branch)) [tag, base] = makeDevBranchRelease(branch, "0.0.1");
  else return "not yet handled";
  // check ig tag exists
  let childtags = repo.tags.filter(t => t.includes(base));
  let isTag = checkIfTagExists(tag, repo);
  if (isTag) return "tag already exists";
  else {
    // get branch hash
    let hash = await repo.getHash(branch);
    // create tag
    let response = await repo.addTag(tag, hash);
    console.log(response);
    // delete branch
    let remove_response = await repo.removeBranch(branch, true);
    console.log(remove_response);
    return `created tag ${tag} on deleted branch: ${branch}`;
  }
}

async function createAllReleaseTagForMainAndDev(branches, repo) {
  while (branches.length) {
    let current = branches.pop();
    if (current) {
      let result = await createReleaseTagForMainAndDev(current, repo);
      console.log(result);
    } else return "finished";
  }
  return "success";
}

function formatTagFromPath(toremove) {
  return function (substitute) {
    return function (path) {
      return path.replace(toremove, substitute);
    };
  };
}

let formatter = formatTagFromPath("zionbase/packages/database/src/")(
  "database/"
);

function fixDatabaseBranches(module) {
  let candidates = repo.tags.filter(e => e.includes(module));
  let formatted = candidates.map(e => [e, formatter(e)]);
  return formatted;
}

async function fixDatabase(list) {
  while (list.length > 0) {
    const current = list.shift();
    if (!current) return;
    else {
      await repo.substituteTag(current[1], current[0]);
      await repo.deleteTag(current[0]);
    }
  }
  await repo.start();
  await repo.createDevMerge();
  console.log("done");
}

async function doit(base, repo) {
  await repo.zaionCommitFirstFolder(repo);
  await repo.zaionCommitAllFiles(repo);
  await repo.createDevMerge();
  await repo.checkout(base);
}

function getDevBranches(list) {
  return list.filter(e => e.includes("/dev"));
}

async function getHashesForBranchList(list, repo) {
  let hashes = [];
  while (list.length > 0) {
    const current = list.shift();
    if (current) {
      let hash = await repo.getHash(current);
      hashes.push(hash);
    }
  }
  return hashes;
}

async function mergeHash(hash) {
  const command = `git merge ${hash}`;
  let response = await execCommand(command);
  console.log(response);
}

async function mergeAllHashes(hashes) {
  while (hashes.length > 0) {
    const current = hashes.shift();
    if (current) {
      await mergeHash(current);
    }
  }
  return "done";
}

function fixBackUp(tag) {
  return [tag, tag.replace("backup/", "newdev/")];
}

async function fixSubStituteDeleteAll(tagstorename, repo) {
  while (tagstorename.length > 0) {
    let current = tagstorename.shift();
    if (!current) {
    }
    let response = await repo.substituteAndDeleteTag(current[1], current[0]);
    console.log(response);
  }
  return "success";
}
