import { existsSync, unlinkSync } from "fs";
import { Server, Socket } from "net";

const HANDLE = "/tmp/test.sock";

if (existsSync(HANDLE)) {
  unlinkSync(HANDLE);
}

const server = new Server({});

const handleError = (err: Error) => console.log(err);
const handleListening = () => console.log(`listening...`);
const handleClose = () => console.log(`closed.`);
const handleData = (data: Buffer) => {
  console.log(data.length);
};
const handleEnd = () => console.log(`data transfer ended.`);

const handleConnection = (client: Socket) => {
  console.log("client connected...");
  client.on("error", handleError);
  client.on("data", handleData);
  client.on("end", handleEnd);
};

server.on("error", handleError);
server.on("connection", handleConnection);
server.on("listening", handleListening);
server.on("close", handleClose);

server.listen(HANDLE);
