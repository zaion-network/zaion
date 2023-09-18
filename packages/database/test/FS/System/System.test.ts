import { system, NoizPath } from "../../../FileSystem";
import { node } from "@zionstate/zionbase/utils";
// const system = require("../../../FileSystem");
// const TreeNode = require("@zionstate/zionbase/zionbase");
import { testEnvironment } from "@zionstate/test";
// const testEnvironment = require("@zionstate/test");

const { expect, log } = testEnvironment();
const remDirLevels = node.zionUtil.removeDirectoryLevels;
// const BASE = system.pathOfFileFromImportMetaUrl(
//   import.meta.url
// );
const BASE = process.cwd();
log(BASE);
const NEST1 = `nested`;
const NEST2 = `url`;
const PATH = `${BASE}/${NEST1}/${NEST2}`;
const FILENAME1 = "filename1.json";
const FILENAME2 = "filename2.json";
FILENAME2;
const DATA = "No Empty";
const NOMEDELLAPROPRIETA = "path";

const initialPath = `${BASE}/this`;
const FILEINSIDEINITIALPATH = "fileInRoot.ts";

const basedir = new NoizPath([BASE]).baseName();
const parentdir = new NoizPath([
  remDirLevels(BASE, 1),
]).baseName();
const testdir = new NoizPath([
  remDirLevels(BASE, 2),
]).baseName();
if (basedir !== "System") throw new Error("wrong folder");
if (parentdir !== "FS") throw new Error("wrong folder");
if (testdir !== "test") throw new Error("wrong folder");

log(basedir);
describe("System.js", () => {
  // METHODS
  describe(`STATIC METHODS`, () => {
    describe("System static method: arrayOfFoldersInDirectory()", () => {
      const NEST1 = `nested`;
      const NEST2 = `url`;
      const PATH = `${BASE}/${NEST1}/${NEST2}`;
      it("dovrebbe ritornare un array contenente i folder contenuti nel percorso fornito", () => {
        system.createNestedDir(PATH);
        let array1 = system.arrayOfFoldersInDirectory(
          `${BASE}/${NEST1}`
        );
        expect(array1[0]!.name).to.be.equal(NEST2);
        system.deleteRecursiveDir(`${BASE}${NEST1}`);
        log(PATH);
      });
    });
    describe("System static method: arrayOfNamesOfFilesInFolder()", () => {
      system.createNestedDir(PATH);
      system.writeJson(`${PATH}/${FILENAME1}`, DATA);
      const array =
        system.arrayOfNamesOfFilesInFolder(PATH);
      it("dovrebbe creare un array con i nomi dei file contenuti nella cartella", () => {
        expect(array.length).not.to.be.null;
      });
      it('il primo elemento dovrebbe avere un membro "name" non nullo', () => {
        expect(array[0]!.name).to.be.not.null;
      });
      it(`il primo elemento dovrebbe avere il nome: "${FILENAME1}"`, () => {
        expect(array[0]!.name).to.be.equal(FILENAME1);
      });
      it(`il primo elemento dovrebbe avere una proprietà chiamata: ${NOMEDELLAPROPRIETA} con valore: \n${PATH}/${FILENAME1}`, () => {
        expect(array[0]).to.have.property(
          NOMEDELLAPROPRIETA,
          `${PATH}/${FILENAME1}`
        );
      });
      system.deleteRecursiveDir(`${BASE}/${NEST1}`);
    });
    // describe("System static method: pathOfFileFromImportMetaUrl()", () => {
    //   const EXPECTEDPATH =
    //     "/Users/WAW/Documents/Projects/ZION/packages/@zionstate/system/test";
    //   const importMetaUrl = process.cwd();
    //   const path =
    //     system.pathOfFileFromImportMetaUrl(importMetaUrl);
    //   it("dovrebbe ritornare il percorso del file da cui si manda il import.meta.url", () => {
    //     expect(path).to.be.equal(EXPECTEDPATH);
    //   });
    // });
    describe("System static method: writeJson()", () => {
      it(`dovrebbe scrivere un file JSON di nome: ${FILENAME1} nel Test Path`, async () => {
        system.writeJson(`${BASE}/${FILENAME1}`, DATA);
        expect(
          system
            .arrayOfNamesOfFilesInFolder(BASE)
            .some(({ name }: { name: any }) => {
              return name === FILENAME1;
            })
        ).to.be.true;
        system.deleteFile(`${BASE}/${FILENAME1}`, err => {
          if (err) log(err.message);
        });
      });
    });
    describe("System static method: createNestedDir()", () => {
      const BASEPATH = BASE;
      const PROVAPATHTARGET = "zeta",
        PROVAPATH1 = "prova",
        PROVAPATH2 = "ricursiva",
        PATH1 =
          BASEPATH +
          "/" +
          PROVAPATHTARGET +
          "/" +
          PROVAPATH1 +
          "/" +
          PROVAPATH2,
        PATH2 = `${BASEPATH}/${PROVAPATHTARGET}`,
        PATH3 =
          `${BASEPATH}/${PROVAPATHTARGET}` +
          `/${PROVAPATH1}`,
        PATH4 =
          `${BASEPATH}/${PROVAPATHTARGET}` +
          `/${PROVAPATH1}/${PROVAPATH2}`;
      it("dovrebbe creare una cartella ricursivamente", () => {
        system.createNestedDir(PATH1);
        expect(system.existsSync(PATH2)).to.be.true;
        expect(system.existsSync(PATH3)).to.be.true;
        expect(system.existsSync(PATH4)).to.be.true;
        system.deleteFolder(PATH4);
        system.deleteFolder(PATH3);
        system.deleteFolder(PATH2);
      });
    });
    describe(`System static method: deleteRecursiveDir()`, () => {
      const NESTEDDIR = "./sono/una/nested/dir";
      const ROOTDIR = "./sono";
      const SECONDLEVDIR = "./sono/una/";
      it(`dovrebbe cancellare il contenuto di una nested directory`, () => {
        system.createNestedDir(NESTEDDIR);
        expect(system.readdirSync(ROOTDIR)[0]).to.be.equal(
          "una"
        );
        system.deleteRecursiveDir(SECONDLEVDIR);
        expect(system.readdirSync(ROOTDIR)[0]).to.be.equal(
          undefined
        );
        system.deleteRecursiveDir(ROOTDIR);
      });
    });
    describe(`Method isFileInFolder()`, () => {
      it(`dovrebbe tornare true controllando che la cartella contenga un file di nome: ${FILEINSIDEINITIALPATH}`, () => {
        system.mkdirSync(initialPath, { recursive: true });
        system.writeFileSync(
          `${initialPath}/${FILEINSIDEINITIALPATH}`,
          "test"
        );
        let result = system.isFileInFolder(
          FILEINSIDEINITIALPATH,
          initialPath
        );
        expect(result).to.be.true;
        system.rmSync(
          `${initialPath}/${FILEINSIDEINITIALPATH}`,
          {
            recursive: true,
            force: true,
          }
        );
      });
      it(`dovrebbe tornare false controllando che la cartella contenga un file specifico`, () => {
        let result = system.isFileInFolder(
          "FILEINSIDEINITIALPATH",
          initialPath
        );
        expect(result).to.be.false;
        system.rmSync(`${BASE}/test`, {
          recursive: true,
          force: true,
        });
      });
    });
  });

  describe("delete files", () => {
    it("", () => {
      const path1 = `${BASE}/nested/`;
      const path2 = `${BASE}/this/`;

      const test1 = system.existsSync(path1);
      const test2 = system.existsSync(path2);
      if (!test1 && !test2) throw new Error("no paths");
      log("test", test1, path1);
      system.deleteRecursiveDir(path1);
      system.deleteRecursiveDir(path2);
    });
  });
});
