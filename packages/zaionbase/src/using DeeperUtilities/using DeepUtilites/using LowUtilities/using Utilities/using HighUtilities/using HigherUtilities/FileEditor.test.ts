import { readFileSync, readdirSync } from "fs";
import { FileEditor } from "./FileEditor";
import { TopUtilities } from "./TopUtilities";
const {
  JavaScript: {
    String_utils: { customTag },
    ArrayUtils: {
      FilterCallbacks: { exclude },
    },
  },
} = TopUtilities;

const test1 = () => {
  const filename = "./test.txt";

  const txdeco = new FileEditor.TextDecorator(filename, 0, [""])
    .setReader(readFileSync)
    .setReadAndSplicer(
      (filename, reader) => reader(filename).toString().split("\n"),
      TopUtilities.JavaScript.ArrayUtils.splicer
    )
    .configureLineEditor((e: string) => customTag` * ${e}`, `/**`, ` */`).value;
  console.log(txdeco);
};

const test2 = () => {
  // /Users/WAW/Desktop/Als Analyzer Project/Nostr/arenamer.ts
  const files = readdirSync("/Users/WAW/Desktop/Als Analyzer Project/Nostr/")
    .filter((e) => e.startsWith("Nip_"))
    .filter(exclude([`Nip_001`]));
  type generateFilenameCb =
    TopUtilities.JavaScript.String_utils.generateFilenameCb;
  const genFilename = TopUtilities.JavaScript.String_utils.generateFilename;
  const TextDecorator = TopUtilities.FileEditor.TextDecorator;

  const withExport: generateFilenameCb = (l) => {
    const cloned_line = l;
    const nip_id = cloned_line.slice(19, 21);
    return `/Users/WAW/Documents/Projects/nips/${nip_id}.md`;
  };
  const withNamesp: generateFilenameCb = (l) => {
    const cloned_line = l;
    const nip_id = cloned_line.slice(12, 14);
    return `/Users/WAW/Documents/Projects/nips/${nip_id}.md`;
  };

  type lineEditor = TopUtilities.FileEditor.lineEditor;
  const lineEditor: lineEditor = (l, i, content) => {
    let result: boolean;
    let filename;
    if (l.startsWith("export namespace _"))
      filename = genFilename(l, withExport);
    else if (l.startsWith("namespace _")) filename = genFilename(l, withNamesp);
    else result = false;
    if (filename) {
      return new TextDecorator<undefined>(filename, i, content)
        .setReader(readFileSync)
        .setReadAndSplicer(
          (filename, reader) => reader(filename).toString().split("\n"),
          TopUtilities.JavaScript.ArrayUtils.splicer
        )
        .configureLineEditor((e: string) => customTag` * ${e}`, `/**`, ` */`)
        .decorate();
    } else return null;
  };
  // /Users/WAW/Documents/Projects/nips/03.md
  const process = (e: string) => {
    const filename = e;
    const content = readFileSync(e).toString().split("\n");
    const edits = content.map(lineEditor).filter(Boolean);

    console.log(edits);
    const path = `./${filename}`;
    const editedcontent = edits[edits.length - 1]![1];

    // writeFileSync(path, (editedcontent as string[]).join("\n"));
  };
  process(`/Users/WAW/Desktop/Als Analyzer Project/Nostr/${files[0]}`);
};
test2();
