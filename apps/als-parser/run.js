import { readdirSync } from "fs";
import { AbletonProjectParser } from "./AbletonProjectParser.js";

const writeFileSync = AbletonProjectParser.writeFileSync;
const readFileSync = AbletonProjectParser.readFileSync;
const gzipSync = AbletonProjectParser.gzipSync;
const gunzipSync = AbletonProjectParser.gunzipSync;
const Renamer = AbletonProjectParser.Renamer;
const AlsBuilder = AbletonProjectParser.AlsBuilder;
const AlsParser = AbletonProjectParser.AlsParser;
const PATH = `/Users/WAW/Music/Ableton/User Library`;
const PATH2 = `/Users/WAW/Desktop/Als Analyzer Project`;
const PATH3 = `/Users/WAW/Dropbox/Projects/GOTEK/GOTEK`;
const PATH4 = `/Users/WAW/Dropbox/Projects/W.A.W/W.A.W`;
const alsparser = new AlsParser();

const testAbletonProjectParser = 0;
const testrename = 0;
const printres = 0;
const testbuildxml = 0;
const parseSet = 1;

if (testAbletonProjectParser) {
  const project = new AbletonProjectParser(".");
}

if (testrename) {
  const renamer = new Renamer(
    "TEST 123.als",
    "hiphop",
    "trap",
    "grunge",
    128,
    "2m",
    "mysong",
    ["midi", "loop"]
  );
  console.log(renamer.rename(4));
}
const start = performance.now();
const FILE = "Als_Analyzer.als";

if (parseSet) {
  let res = alsparser.get("parsed", FILE)[0].Ableton.LiveSet.Tracks;
  let contains2AudioClips = res.AudioTrack[0];
  let containsAFreezedClip = res.AudioTrack[1];
  let allAudioFx = res.AudioTrack[2];
  let audiotrack3 = res.AudioTrack[3];
  let abl = res.MidiTrack[0];
  let serum = res.MidiTrack[1];
  let serum2 = res.MidiTrack[2];
  let operator = res.MidiTrack[3];
  let analog = res.MidiTrack[4];
  let collision = res.MidiTrack[5];
  let drumrack = res.MidiTrack[6];
  let electric = res.MidiTrack[7];
  let externalinstrument = res.MidiTrack[8];
  let intrumentrack = res.MidiTrack[10];
  let tension = res.MidiTrack[13];
  let group = res.GroupTrack;

  let simpler = res.MidiTrack[12];
  let sampler = res.MidiTrack[11];
  let wavetable = res.MidiTrack[14];
  let impulse = res.MidiTrack[9];

  let objj =
    impulse.DeviceChain.DeviceChain.Devices.InstrumentImpulse.SourceContext
      .Value.BranchSourceContext.OriginalFileRef;
  // AbletonProjectParser.showKeysOfObj(objj);
}

if (printres) {
  let res = alsparser.get("objectOfValue", FILE, ".", [
    "Freeze 7-Operator [2023-05-07 160609].wav",
    12,
  ]);
  console.log(res);
}

if (testbuildxml) {
  const dest = "./data/Als_Anlayzer.xml";
  const TESTALS = "./test.als";

  const advancedparser = new AlsParser("advanced");
  let parsedxml = advancedparser.get("parsed", FILE)[0];

  const sampleRef =
    parsedxml[1].Ableton[0].LiveSet[4].Tracks[1].AudioTrack[19].DeviceChain[7]
      .MainSequencer[16].Sample[0].ArrangerAutomation[0].Events[0].AudioClip[28]
      .SampleRef;
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
}

// alsparser.get("basicInfo", "TEST 123.als");

const stop = performance.now();
const elapsed = stop - start;
console.log("elapsed", elapsed / 1000);

const testmap = new Map();
testmap.set("a", { a: "ciao" });
const json = JSON.stringify(Array.from(testmap));
console.log(new Map(JSON.parse(json)));
