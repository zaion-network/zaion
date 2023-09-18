import * as _NoizPath from ".";
const NoizPath: NoizPath = _NoizPath;

interface NoizPath {
  NoizPath: AbstractNoizPathCtor;
  NoizPathCtor: AbstractNoizPathCtor;
}

abstract class AbstractNoizPath {
  abstract path: string;
  abstract directory(): string;
  abstract baseName(): string;
}

interface AbstractNoizPathCtor {
  joinPaths(...paths: string[]): string;
  new (paths?: string[]): AbstractNoizPath;
}
