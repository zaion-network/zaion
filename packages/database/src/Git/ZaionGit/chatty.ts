import { execSync } from "child_process";

interface CommitNode {
  commitId: string;
  parents: CommitNode[];
}

function parseGitLog(log: string): CommitNode[] {
  const lines = log.trim().split("\n");
  const commitMap: { [commitId: string]: CommitNode } = {};

  lines.forEach(line => {
    const [commitId, parentIds] = line.split(":");
    const parents = parentIds.split(",").map(id => commitMap[id]);
    const commitNode: CommitNode = { commitId, parents };
    commitMap[commitId] = commitNode;
  });

  const rootNodes: CommitNode[] = [];
  for (const commitId in commitMap) {
    const node = commitMap[commitId];
    if (node.parents.length === 0) {
      rootNodes.push(node);
    }
  }

  return rootNodes;
}

function getGitCommitLog(): string {
  try {
    return execSync('git log --pretty=format:"%H:%P"').toString();
  } catch (error: any) {
    console.error("Error running git log:", error.message);
    return "";
  }
}

function createCommitGraphFromGitLog(): CommitNode[] {
  const gitLog = getGitCommitLog();
  if (!gitLog) {
    return [];
  }
  return parseGitLog(gitLog);
}

// Esempio di utilizzo
const commitGraph = createCommitGraphFromGitLog();
console.log(commitGraph);
