import { NewAbletonProjectParser } from "./NewAbletonProjectParser";
const UndefinedFileExistDbState =
  NewAbletonProjectParser.Db.State.UndefinedFileExistDbState;
const UnloadedDbState = NewAbletonProjectParser.Db.State.UnloadedDbState;
type UnloadedDbState = NewAbletonProjectParser.Db.State.UnloadedDbState;
const FileDoesntExistDbState =
  NewAbletonProjectParser.Db.State.FileDoesntExistDbState;
type FileDoesntExistDbState =
  NewAbletonProjectParser.Db.State.FileDoesntExistDbState;
const EmptyDbState = NewAbletonProjectParser.Db.State.EmptyDbState;
type EmptyDbState = NewAbletonProjectParser.Db.State.EmptyDbState;
const GotDataDbState = NewAbletonProjectParser.Db.State.GotDataDbState;
type GotDataDbState = NewAbletonProjectParser.Db.State.GotDataDbState;
const LoadedDbState = NewAbletonProjectParser.Db.State.LoadedDbState;
type LoadedDbState = NewAbletonProjectParser.Db.State.LoadedDbState;

const unloaded = new UndefinedFileExistDbState();
const loaded = unloaded.checkIfFileExists();

let dbstate_1: 0 | 1 | undefined = undefined;
loaded instanceof FileDoesntExistDbState
  ? (dbstate_1 = 0)
  : (dbstate_1 = undefined);
loaded instanceof UnloadedDbState ? (dbstate_1 = 1) : (dbstate_1 = undefined);
const dbstate1_map = new Map();
dbstate1_map.set(0, (state: FileDoesntExistDbState) => state.createFile());
dbstate1_map.set(1, (state: UnloadedDbState) => state.hasData());
let init_step1 = dbstate1_map.get(dbstate_1)(loaded);

let dbstate_2: undefined | boolean = undefined;
init_step1 instanceof EmptyDbState ? (dbstate_2 = true) : undefined;
init_step1 instanceof GotDataDbState ? (dbstate_2 = false) : undefined;
const dbstate2_map = new Map();
dbstate2_map.set(true, (state: EmptyDbState) => state.initialize());
dbstate2_map.set(false, (state: GotDataDbState) => state.parsedb());
const init_step2 = dbstate2_map.get(dbstate_2)(init_step1);

let dbstate_3: undefined | 0 | 1 = undefined;
init_step2 instanceof GotDataDbState
  ? (dbstate_3 = 0)
  : (dbstate_3 = undefined);
init_step2 instanceof LoadedDbState ? (dbstate_3 = 1) : (dbstate_3 = undefined);
const dbstate_3_map = new Map();
dbstate_3_map.set(0, (state: GotDataDbState) => state.parsedb());
dbstate_3_map.set(1, () => init_step2);
let init_step3 = dbstate_3_map.get(dbstate_3)(init_step2);
console.log(init_step3);

const abletonParser = 0;
