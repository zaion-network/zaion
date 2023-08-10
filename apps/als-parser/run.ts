import {
  AbletonProjectParser,
  AbletonProjectParserDebug,
} from "./AbletonProjectParser";
// import { TypescriptDeclarationGenerator } from "./TypescriptDeclarationGenerator";
import { Track } from "./Types/Track";
import { MultiSamplePart, OriginalSimpler } from "./Types/Instruments/Simpler";
import { DrumBranch } from "./Types/DrumBranch";
import { Device } from "./Types/Device";
import { RelativePathElement } from "./Types/RelativePathElement";
import { deflateSync, inflateSync, unzipSync } from "zlib";
import {
  Update,
  Scan,
  DeeperUtilities,
  DeepUtilities,
  TopUtilities,
  HigherUtilities as Utilities,
} from "@zaionstate/zaionbase";
type AudioTrack = Track.AudioTrack;
type MidiTrack = Track.MidiTrack;

const writeFileSync = AbletonProjectParser.writeFileSync;
const readFileSync = AbletonProjectParser.readFileSync;
const gzipSync = AbletonProjectParser.gzipSync;
const gunzipSync = AbletonProjectParser.gunzipSync;
const Renamer = AbletonProjectParser.Renamer;
const AlsBuilder = AbletonProjectParser.AlsBuilder;
const AlsParser = AbletonProjectParser.AlsParser;

const TESTSCAN = 0;
const TESTPROJECTPARSER = 1;
const TESTABLETONPARSER = 0;
const ALCPARSER = 0;
const testbuildxml = 0;
const FINDAVLUE = 0;
const PARSEMETHOD = 0;
const BENCHMARK = 0;
const start = performance.now();
const FILE = "Als_Analyzer.als";
const FILE2 = "Als_Analyzer_noev.als";
const FILE3 = "Als_Analyzer_wo.als";
const PROJECT2 = "/Users/WAW/Dropbox/Projects/W.A.W/W.A.W";
const CLIP = "./clips/Impulse1.alc";
const CLIP2 = "./clips/Electric1.alc";

// .Ableton.LiveSet.Tracks.AudioTrack.0.DeviceChain.MainSequencer.ClipSlotList.ClipSlot.0.ClipSlot.Value.AudioClip.SampleRef.FileRef.Name.@Value

if (TESTSCAN) {
  (async function () {
    const DB = "./data/db.txt";
    const db = JSON.parse(readFileSync(DB, { encoding: "utf8" })).db;
    let scanresult = new TopUtilities.Node.FileSystem.HasUpdated(
      "hash"
    ).execute(new Scan("sh").execute("."), db, ".");
    // let scanresult = new HasUpdated("update").execute(".");
    // let scanresult = new HasUpdated("scan").execute(".");
    // let scanresult = new HasUpdated("shFind").execute(".");
    // let scanresult = new HasUpdated("length").execute(db, ".");
    const format = (s: string, slash?: boolean) => {
      if (slash) {
        return `./${s}`;
      } else {
        return s;
      }
    };
    console.log(
      // .filter((e) => e.includes(format("node_modules/.bin")))
      // .slice(0, 100)
      //
      scanresult
    );
  })();
}
if (TESTPROJECTPARSER)
  (async function () {
    const projectparser = new AbletonProjectParserDebug(PROJECT2);
    // projectparser.show("project");
    type GenericFunction<A extends any[], R> = DeeperUtilities.GenericFunction<
      A,
      R
    >;
    const Conditioner = DeepUtilities.Conditioner;
    const makeValidations = Conditioner.makeValidations;
    const goo = () => {
      return "";
    };
    const moo = () => {
      return 0;
    };
    // type op = inferGenericFunction<typeof goo>;
    let oooo = makeValidations([goo, []], [moo, []]);
    let uhuh = new Conditioner().boolean([false, oooo]);
  })();
if (TESTABLETONPARSER)
  (async function () {
    const alsparser = new AlsParser();
    let res = await alsparser.get("allSamples", CLIP2);
    console.log(res);
  })();
if (ALCPARSER) {
  (async function () {
    const unzipped = gunzipSync(readFileSync(CLIP)).toString().slice(0, 1000);
    console.log(unzipped);
  })();
}
if (testbuildxml)
  (async function () {
    const dest = "./data/Als_Anlayzer.xml";
    const TESTALS = "./test.als";

    const advancedparser = new AlsParser("advanced");
    let parsedxml = (await advancedparser.get("parsed", FILE))[0];

    const sampleRef =
      //@ts-expect-error
      parsedxml[1].Ableton[0].LiveSet[4].Tracks[1].AudioTrack[19].DeviceChain[7]
        .MainSequencer[16].Sample[0].ArrangerAutomation[0].Events[0]
        .AudioClip[28].SampleRef;
    const fileRef = sampleRef[0].FileRef;

    const NUNAME = "hellsample.wav";
    const CHANGENAME = false;
    if (CHANGENAME) {
      fileRef[3][":@"]["@Value"] = NUNAME;
    }

    const CHANGEPATHHINT = false;
    const NUPATH = "hellbanks";

    if (CHANGEPATHHINT) {
      fileRef[7].SearchHint[0].PathHint[3][":@"]["@Dir"] = NUPATH;
    }
    const CHANGERELATIVEPATH = true;
    if (CHANGERELATIVEPATH) {
      fileRef[2].RelativePath[1][":@"]["@Dir"] = NUPATH;
    }

    const writeCopyOfAlsAnalyzer = false;
    const startingpoint = parsedxml;
    let builder = new AlsBuilder(startingpoint);
    let test = builder.buildXml();

    writeFileSync(TESTALS, gzipSync(test));
    console.log(gunzipSync(readFileSync(TESTALS)).toString().indexOf(NUNAME));

    if (writeCopyOfAlsAnalyzer) {
      const buffer = readFileSync(FILE);
      const decompressed = gunzipSync(buffer);
      writeFileSync(dest, decompressed.toString());
    }
  })();
if (FINDAVLUE) {
  const alsparser = new AlsParser();
  let res = alsparser.get(
    "pathsOfValue",
    FILE2,
    ".",
    "Freeze 7-Operator [2023-05-07 160609].wav"
  );

  // console.log(res[0]);
}
if (PARSEMETHOD)
  (async function () {
    const alsparser = new AlsParser();
    let parsed = (await alsparser.get("parsed", FILE2))[0];
    console.log(
      (
        parsed.Ableton.LiveSet.Tracks.MidiTrack as MidiTrack[]
      )[3].DeviceChain.FreezeSequencer.ClipSlotList.ClipSlot.filter(
        (e) => e.ClipSlot.Value !== ""
      )
    );
  })();
if (BENCHMARK) {
  (async function () {
    async function inflate() {
      const inflated = unzipSync(readFileSync(FILE));
      return inflated;
    }
    async function deflate(buffer: Buffer) {
      const deflated = deflateSync(buffer);
      return deflated;
    }
    const benchmark = Utilities.benchmark;
    let inflated = await benchmark(inflate, []);
    console.log("inflated size: ", inflated.length / 1024);

    let deflated = await benchmark(deflate, [inflated]);
    console.log("deflated size: ", deflated.length / 1024);
  })();
}
let parser;
let hash;
const createHash = Utilities.Node.Crypto.hashIt;

const stop = performance.now();
console.log(stop - start);
