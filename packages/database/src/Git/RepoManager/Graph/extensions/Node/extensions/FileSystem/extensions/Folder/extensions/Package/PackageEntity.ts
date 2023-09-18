import { Node } from "../../../../../..";

export class PackageEntity extends Node {}
export class Index extends PackageEntity {}
export class Module extends PackageEntity {}
export class Test extends PackageEntity {}
export class App extends PackageEntity {}
export class NextApp extends App {}
