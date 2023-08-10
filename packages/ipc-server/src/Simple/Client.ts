import { readFileSync } from "fs";
import { Socket } from "net";
import { Readable } from "stream";

const HANDLE = "/tmp/test.sock";
const FILE = "/Users/WAW/Desktop/Als Analyzer Project/Als_Analyzer.als";
const stream = new Readable();
const client = new Socket({});

stream.push(readFileSync(FILE));
stream.push(null);
const handleError = (err: Error) => console.log(err);
const handleConnect = () => {
  console.log(`connected...`);
  stream.pipe(client);
};

client.on("error", handleError);
client.on("connect", handleConnect);

client.connect(HANDLE);
