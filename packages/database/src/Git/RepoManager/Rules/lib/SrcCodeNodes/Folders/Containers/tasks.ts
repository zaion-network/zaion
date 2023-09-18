import { SrcCodeNode } from "../../../../SrcCodeNode";

const ContainerRule = SrcCodeNode.ContainerRule;
const originFiles = SrcCodeNode.ContainerRule.originFiles;

let tasks_rule = new ContainerRule();
tasks_rule.firstFile = originFiles.readme;

let tasksSort = SrcCodeNode.FolderContent.sorts.tasks;

export let tasks = new SrcCodeNode(tasksSort, tasks_rule);

let tasks_apps_rule = new ContainerRule();
tasks_apps_rule.firstFile = originFiles.noiz;

export let tasks_apps = new SrcCodeNode(
  tasksSort + "_apps",
  tasks_apps_rule
);

let tasks_packages_rule = new ContainerRule();
tasks_packages_rule.firstFile = originFiles.noiz;

export let tasks_package = new SrcCodeNode(
  tasksSort + "_packages",
  tasks_packages_rule
);
